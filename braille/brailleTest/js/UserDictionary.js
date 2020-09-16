/*
REQUIRES: UserDictionaryEntry.js and BrailleConverter.js
UserDictionary loads and manages user specified dictionaries
*/
function UserDictionary() {

	//length indicies hold the indicies in entries that holds the last entry with a given length
	var originalText;
	var lengthIndicies = [];
	var entries = [];
	var largestLength = -1;
	var smallestLength = Infinity;
	
	//checks to see if data has been loaded into the dictionary object
	var isLoaded = false;

	/*
	sets original text, only works once before clear must be called again
	*/
	this.setOriginalText = function(text) {

		if(!isLoaded && !originalText) {

			originalText = text;

		}

	}

	/*
	getter for original text
	
	used to get the data from which the dictionary was generated, to be used when the dictionary is downloaded
	*/
	this.getOriginalText = function() {

		return originalText;

	}

	/*
	for a given length returns the index in lengthIndicies which holds the index in entires of
	the largest entry that is of length or smaller

	if no such index exists then return -1
	*/
	function getIndexForLength(length) {

		if(!(typeof length == "number" || length instanceof Number)) {

			throw Messages.BAD_TYPE;

		}

		for(var i=length;i>0;i--) {

			if(lengthIndicies[i] != undefined) {
			
				return lengthIndicies[i];
			
			}else if(i === 1) {
			
				return -1;
			
			}
		
		}

		return -1;

	}

	/*
	getter for entry list
	*/
	this.getEntryList = function() {

		return entries;

	}

	/*
	returns entry at index, if a negative index is given getEntry will attempt to wrap around
	*/
	this.getEntry = function (index) {

		if(!(typeof index == "number" || index instanceof Number)) {

			throw Messages.BAD_TYPE;

		}

		//performance could be slightly improved by switching around the order of the if statements
		if(index > entries.length - 1) {
	
			throw Messages.INDEX_TOO_LARGE;
		}else if(index < 0 && Math.abs(index) > entries.length - 1) {

			//handles cases where negative value has no meaningful wraparound value
			throw Messages.INDEX_TOO_SMALL;
		
		}else if(index < 0){
		
			//wraparound
			//e.x. getEntry(-1) returns the last element in entries
			return entries[entries.length+index];
		
		}else {

			return entries[index];
		
		}
	}

	/*
	must be called whenever the dictionary is given meaningful data
	*/
	var setLoadedTrue = function() {

		isLoaded = true;

	}
	
	/*
	returns the value of isLoaded
	*/
	this.isLoaded = function() {
		return isLoaded;
	}
	
	/*
	Resets the instance to a default state where additional data can easily
	be loaded.
	*/
	this.clear = function() {
		
		lengthIndicies = [];
		entries = [];
		
		//the first entry to be added will always have a length greater than 1
		largestLength = -1;

		//the first entry to be added will always have a length less than Infinity
		smallestLength = Infinity;
		isLoaded = false;
	}
	
	/*
	Returns a random entry of maxLength or shorter
	maxLength defaults to the length of the largest word in the dictionary
	*/
	this.getRandomEntry = function(maxLength) {
		
		//if maxLength isn't defined set it to the largest word in the dictionary
		maxLength = maxLength || largestLength;

		if(!(typeof maxLength == "number" || maxLength instanceof Number)) {

			throw Messages.BAD_TYPE;

		}

		//verify maxLength is a meaningful value
		if(maxLength > largestLength) {
			maxLength = largestLength;
		}
		
		if(maxLength < smallestLength) {
			throw Messages.MAX_LENGTH_TOO_SMALL;
		}

		var randomEntryMax;

		//get the last index which is equal to or less than maxLength
		while(isNaN(randomEntryMax)) {

			randomEntryMax = lengthIndicies[maxLength] + 1;
			maxLength -= 1;

		}

		var randomEntryIndex = Math.floor(Math.random() * randomEntryMax);
		
		return entries[randomEntryIndex];
		
	}

	/*
	adds an entry to the dictionary, updates lengthIndicies automatically
	*/
	this.addEntry = function(latin,braille) {

		var UDE;

		//both arguments passed were strings
		if((typeof latin == "string" || latin instanceof String) && (typeof braille == "string" || braille instanceof String)) {

			UDE = new UserDictionaryEntry(latin,braille);

		//latin is an object, assume it is a dictionary entry
		}else if(typeof latin == "object") {

			UDE = latin;
			latin = UDE.getLatin();
			braille = UDE.getBraille();

		}

		//find the position where we are going to insert the new entry
		var index = getIndexForLength(braille.length) + 1;
		//remove all the entries with a greater index;
		var temp = entries.splice(index);
		//add the new entry
		entries.push(UDE);
		//put all the old entries back
		for(var i=0;i<temp.length;i++) {
			entries.push(temp[i]);
		}
		//make sure largestLength is correct
		if(braille.length > largestLength) {
			largestLength = braille.length;
		}
		if(braille.length < smallestLength) {
			smallestLength = braille.length;
		}
		lengthIndicies[braille.length] = index;
		//add 1 to the lengthIndicies for all larger lengths as they have effectively been shifted to the right
		for(var i=braille.length+1;i<=largestLength;i++) {
			if(lengthIndicies[i] != undefined) {
				lengthIndicies[i] += 1;
			}
		}
	}

	/*
	tests to see if the string consists only of numbers

	second argument is if spaces/whitespace is allowed or not
	this defaults to false
	*/
	function isAllNumbers(string, allowSpaces) {

		if(allowSpaces) {

			string = string.replace(/ /g,'').trim();

		}

		return /^\d+$/.test(string);

	}

	/*
	takes a string as from a line of a dictionary and returns a entry object
	*/
	function getEntryFromString(dataString, grade) {

		//split the raw data
		var entryData = dataString.split(",");

		//variables to be used for the entry object
		var braille;
		var latin = entryData[0];

		if(latin.trim().length == 0) {

			return false;

		}

		if(entryData.length == 1) {

			console.log(latin);
			console.log(Flashcards.grade);

			braille = BrailleConverter.latinWordToJSString(latin, Flashcards.grade);

		//if the user gave us only numbers after the comma then use that to generate the braille string
		}else if(isAllNumbers(entryData[1], true)) {

			braille = BrailleConverter.brailleWordToJSString(entryData[1]);

		//if the user didn't give us numbers after the comma then throw the latin into automated transcription
		}else if(BrailleConverter.isSupported(latin)){

			braille = BrailleConverter.latinWordToJSString(latin, Flashcards.grade);

		//if the user gave us unsupported text, throw an error
		}else {

			throw Messages.BAD_DATA;

		}

		//return the entry
		return new UserDictionaryEntry(latin, braille);

	}

	/*
	loads data to the dictionary from a given string and grade

	to load from a file FileIO.uploadDictionary should be used and will invoke this method
	*/
	this.loadFromString = function(data, grade) {

		this.clear();

		this.setOriginalText(data);
		var reContainsNumbers = /[0-9]/;

		//there has to be at least two lines in the dictionary
		if(data.indexOf("\n") == -1) {

			throw Messages.BAD_DATA;

		}

		var dictionaryData = data.split("\n");

		//start at i=1 because we are skipping the first line
		for(var i=1;i<dictionaryData.length;i++) {

			/*

			var entryData = dictionaryData[i].trim().split(",");
			var braille;
			var latin = entryData[0];

			//this comparison shouldn't care if entryData[1] doesn't exist or not
			//that means that if there is no comma then the if statement always evaluates to true, which is exactly what we want
			if(!reContainsNumbers.test(entryData[1]) && BrailleConverter.isSupported(latin)) {
				//console.log(latin);
				braille = BrailleConverter.latinWordToJSString(latin,grade);
			}else {

				if(!BrailleConverter.isSupported(latin)) {

					Form.addAlert(Messages.UNSUPPORTED_CHAR);
					throw Messages.UNSUPPORTED_CHAR;

				}

				console.log(latin);
				console.log(entryData[1]);
				braille = BrailleConverter.brailleWordToJSString(entryData[1]);
			}

			
			//prevents "blank" entries from making their way into dictionaries
			//this also allows 'skipped' lines
			if(latin.length > 0) {

				this.addEntry(latin,braille);

			}

			*/

			var UDE = getEntryFromString(dictionaryData[i]);

			console.log(UDE);

			this.addEntry(UDE);

		}

		//only time the loaded flag should be called
		setLoadedTrue();

	}

}
