/*

REQUIRES: grade2dictionary.txt serverside, no way around this

The BrailleConverter object handles all of the conversion between braille
and the latin alphabet. Internally it uses strings that consist of space
seperated series of digits 1-6. These digits correspond to the braille dots
and spaces denote seperate braille characters.
dots 7 and 8 are valid and are supported by BrailleConverter but are not used
internally as these are used for special Braille notations which may be
included in user specified dictionaries

TODO 
make methods properly private/public/privilaged

*/

BrailleConverter = {};

//error message prefix for grade 2 dictionary failing to load
BrailleConverter.G2_FAILED_TO_LOAD = "Failed to load grade 2 dictionary";

//full path used to request grade2dictionary
BrailleConverter.G2_DICT_PATH = "grade2dictionary.txt";
BrailleConverter.G2_REQUEST_METHOD = "GET";

//index of the first braille character (blank character) in unicode
BrailleConverter.UNICODE_BRAILLE_START = 10240;

//type used by BrailleConverter.getLatinCharacterType
//any unique value can be used for the types, but Number is optimal
BrailleConverter.TYPE_LOWER = 0;
BrailleConverter.TYPE_UPPER = 1;
BrailleConverter.TYPE_NUMBER = 2;

//anything that isn't a letter or number
BrailleConverter.TYPE_SPECIAL = 3;

/*
anything that doesn't have an entry on BrailleConverter.BrailleTable
gets replaced by a long dash in braille
*/
BrailleConverter.TYPE_UNKNOWN = 4;

BrailleConverter.BrailleTable = [];
BrailleConverter.BrailleTable['a'] = '1';
BrailleConverter.BrailleTable['b'] = '12';
BrailleConverter.BrailleTable['c'] = '14';
BrailleConverter.BrailleTable['d'] = '145';
BrailleConverter.BrailleTable['e'] = '15';
BrailleConverter.BrailleTable['f'] = '124';
BrailleConverter.BrailleTable['g'] = '1245';
BrailleConverter.BrailleTable['h'] = '124';
BrailleConverter.BrailleTable['i'] = '24';
BrailleConverter.BrailleTable['j'] = '245';
BrailleConverter.BrailleTable['k'] = '13';
BrailleConverter.BrailleTable['l'] = '123';
BrailleConverter.BrailleTable['m'] = '134';
BrailleConverter.BrailleTable['n'] = '1345';
BrailleConverter.BrailleTable['o'] = '135';
BrailleConverter.BrailleTable['p'] = '1234';
BrailleConverter.BrailleTable['q'] = '12345';
BrailleConverter.BrailleTable['r'] = '1235';
BrailleConverter.BrailleTable['s'] = '234';
BrailleConverter.BrailleTable['t'] = '2345';
BrailleConverter.BrailleTable['u'] = '136';
BrailleConverter.BrailleTable['v'] = '1236';
BrailleConverter.BrailleTable['w'] = '2456';
BrailleConverter.BrailleTable['x'] = '1346';
BrailleConverter.BrailleTable['y'] = '13456';
BrailleConverter.BrailleTable['z'] = '1356';

/*
numbers in braille require a number sign in front of them to distinguish
them from letters, for convenence they were added as seperate entries to
the table
*/
BrailleConverter.BrailleTable['1'] = BrailleConverter.BrailleTable['a'];
BrailleConverter.BrailleTable['2'] = BrailleConverter.BrailleTable['b'];
BrailleConverter.BrailleTable['3'] = BrailleConverter.BrailleTable['c'];
BrailleConverter.BrailleTable['4'] = BrailleConverter.BrailleTable['d'];
BrailleConverter.BrailleTable['5'] = BrailleConverter.BrailleTable['e'];
BrailleConverter.BrailleTable['6'] = BrailleConverter.BrailleTable['f'];
BrailleConverter.BrailleTable['7'] = BrailleConverter.BrailleTable['g'];
BrailleConverter.BrailleTable['8'] = BrailleConverter.BrailleTable['h'];
BrailleConverter.BrailleTable['9'] = BrailleConverter.BrailleTable['i'];
BrailleConverter.BrailleTable['0'] = BrailleConverter.BrailleTable['j'];

BrailleConverter.BrailleTable['&'] = '4 12346';
BrailleConverter.BrailleTable['<'] = '4 126';
BrailleConverter.BrailleTable['>'] = '4 345';
BrailleConverter.BrailleTable['\''] = '3';
BrailleConverter.BrailleTable['*'] = '5 35';
BrailleConverter.BrailleTable['@'] = '4 1';
BrailleConverter.BrailleTable['\\'] = '456 16';
BrailleConverter.BrailleTable['{'] = '456 126';
BrailleConverter.BrailleTable['}'] = '456 345';
BrailleConverter.BrailleTable['('] = '5 126';
BrailleConverter.BrailleTable[')'] = '5 345';
BrailleConverter.BrailleTable['['] = '46 126';
BrailleConverter.BrailleTable[']'] = '46 345';
BrailleConverter.BrailleTable[':'] = '25';
BrailleConverter.BrailleTable[','] = '2';
BrailleConverter.BrailleTable['#'] = '456 1456';
BrailleConverter.BrailleTable['~'] = '4 35';
BrailleConverter.BrailleTable['.'] = '256';
BrailleConverter.BrailleTable['='] = '5 1256';
BrailleConverter.BrailleTable['!'] = '235';
BrailleConverter.BrailleTable['/'] = '456 34';

/*
minus and hyphen and dash are all seperate characters in braille, this
refers to hyphen as that is the most likely usage in braille flashcards.
*/
BrailleConverter.BrailleTable['-'] = '36';

/*
Open and close quotes in braille are two different characters, this represents seconds or inches
This makes more sense in the context of braille flashcards
*/
BrailleConverter.BrailleTable['"'] = '6 2356';

BrailleConverter.BrailleTable['_'] = '46 36';
BrailleConverter.BrailleTable['%'] = '46 356';
BrailleConverter.BrailleTable['+'] = '5 235';
BrailleConverter.BrailleTable[';'] = '23';
BrailleConverter.BrailleTable['$'] = '4 234';
BrailleConverter.BrailleTable['^'] = '45';
BrailleConverter.BrailleTable['?'] = '236';
BrailleConverter.BrailleTable['|'] = '456 1256';

//this may not be 100% accurate, backtick has multiple uses and contexts
BrailleConverter.BrailleTable['`'] = '2356';

/*
on brl.org this is listed as the double dash, its purpose is to mark ommissions
it is included in BrailleTable because it is technically a single latin character
*/
BrailleConverter.BrailleTable['__'] = '36 36 36 36';

/*
space in braille is represented with no raised dots, due to the method used
to get the unicode index leaving the string blank results in a zero which
corresponds to the blank braille character at the start of the unicode
sequence
*/
BrailleConverter.BrailleTable[' '] = '';
	
/*
BrailleSpecialCharacters contains characters that exist in braille that do
not exist in the latin alphabet.
*/
BrailleConverter.BrailleSpecialCharacters = {};
BrailleConverter.BrailleSpecialCharacters.capitalIndicator = '6';
BrailleConverter.BrailleSpecialCharacters.capitalWord = '6 6';
BrailleConverter.BrailleSpecialCharacters.capitalTerminator = '63';
BrailleConverter.BrailleSpecialCharacters.numberIndicator = '3456';

/*
Grade1Indicator is used when going from numbers back to letters
It has other uses but for flashcards that is all we need it for
*/
BrailleConverter.BrailleSpecialCharacters.grade1Indicator = '56';

//Accented characters in braille have a 'prefix' that describes the accent followed by the typical braille character
BrailleConverter.BrailleSpecialCharacters.acutePrefix = '45 34';
BrailleConverter.BrailleSpecialCharacters.cedillaPrefix = '45 12346';
BrailleConverter.BrailleSpecialCharacters.circleAbovePrefix = '45 1246';
BrailleConverter.BrailleSpecialCharacters.circumflexPrefix = '45 146';
BrailleConverter.BrailleSpecialCharacters.diaeresisPrefix = '45 25';
BrailleConverter.BrailleSpecialCharacters.gravePrefix = '45 16';
BrailleConverter.BrailleSpecialCharacters.tildePrefix = '45 12456';
BrailleConverter.BrailleSpecialCharacters.umlautPrefix = '45 25';

/*Accented characters
NOTE: As of now these are only the most relevant accented characters to
english, if foreign language support is needed add more
NOTE: These aren't tested very well
*/

//acute
BrailleConverter.BrailleTable['\u00E1'] = BrailleConverter.BrailleSpecialCharacters.acutePrefix + " " + BrailleConverter.BrailleTable['a'];
BrailleConverter.BrailleTable['\u00F3'] = BrailleConverter.BrailleSpecialCharacters.acutePrefix + " " + BrailleConverter.BrailleTable['o'];
BrailleConverter.BrailleTable['\u00E9'] = BrailleConverter.BrailleSpecialCharacters.acutePrefix + " " + BrailleConverter.BrailleTable['e'];

//cedilla
BrailleConverter.BrailleTable['\u00E7'] = BrailleConverter.BrailleSpecialCharacters.cedillaPrefix + " " + BrailleConverter.BrailleTable['c'];

//ring above
BrailleConverter.BrailleTable['\u00E5'] = BrailleConverter.BrailleSpecialCharacters.circleAbovePrefix + " " + BrailleConverter.BrailleTable['a'];

//circumflex
BrailleConverter.BrailleTable['\u00E2'] = BrailleConverter.BrailleSpecialCharacters.circumflexPrefix + " " + BrailleConverter.BrailleTable['a'];
BrailleConverter.BrailleTable['\u00EA'] = BrailleConverter.BrailleSpecialCharacters.circumflexPrefix + " " + BrailleConverter.BrailleTable['e'];
BrailleConverter.BrailleTable['\u00EE'] = BrailleConverter.BrailleSpecialCharacters.circumflexPrefix + " " + BrailleConverter.BrailleTable['i'];
BrailleConverter.BrailleTable['\u00FB'] = BrailleConverter.BrailleSpecialCharacters.circumflexPrefix + " " + BrailleConverter.BrailleTable['u'];
BrailleConverter.BrailleTable['\u00F4'] = BrailleConverter.BrailleSpecialCharacters.circumflexPrefix + " " + BrailleConverter.BrailleTable['o'];

//diaeresis
BrailleConverter.BrailleTable['\u00F6'] = BrailleConverter.BrailleSpecialCharacters.diaeresisPrefix + " " + BrailleConverter.BrailleTable['o'];
BrailleConverter.BrailleTable['\u00EB'] = BrailleConverter.BrailleSpecialCharacters.diaeresisPrefix + " " + BrailleConverter.BrailleTable['e'];
BrailleConverter.BrailleTable['\u00EF'] = BrailleConverter.BrailleSpecialCharacters.diaeresisPrefix + " " + BrailleConverter.BrailleTable['i'];
BrailleConverter.BrailleTable['\u00FC'] = BrailleConverter.BrailleSpecialCharacters.diaeresisPrefix + " " + BrailleConverter.BrailleTable['u'];

//grave
BrailleConverter.BrailleTable['\u00E0'] = BrailleConverter.BrailleSpecialCharacters.gravePrefix + " " + BrailleConverter.BrailleTable['a'];
BrailleConverter.BrailleTable['\u00F2'] = BrailleConverter.BrailleSpecialCharacters.gravePrefix + " " + BrailleConverter.BrailleTable['o'];
BrailleConverter.BrailleTable['\u00E8'] = BrailleConverter.BrailleSpecialCharacters.gravePrefix + " " + BrailleConverter.BrailleTable['e'];

//tilde
BrailleConverter.BrailleTable['\u00F1'] = BrailleConverter.BrailleSpecialCharacters.tildePrefix + " " + BrailleConverter.BrailleTable['n'];

/*
DictionaryContractionSymbols contains the data for the contractions used in the grade 2 dictionary, none
of these entries correleate with the actual braille representations of the characters themselves.
The correct braille for the characters themselves are in BrailleTable
*/

BrailleConverter.DictionaryContractionSymbols = [];

BrailleConverter.DictionaryContractionSymbols['.'] = '46';
BrailleConverter.DictionaryContractionSymbols[','] = '6';
BrailleConverter.DictionaryContractionSymbols['&'] = '12346';
BrailleConverter.DictionaryContractionSymbols['='] = '123456';
BrailleConverter.DictionaryContractionSymbols['('] = '12356';
BrailleConverter.DictionaryContractionSymbols[')'] = '23456';
BrailleConverter.DictionaryContractionSymbols['*'] = '16';
BrailleConverter.DictionaryContractionSymbols['<'] = '126';
BrailleConverter.DictionaryContractionSymbols['%'] = '146';
BrailleConverter.DictionaryContractionSymbols['?'] = '1456';
BrailleConverter.DictionaryContractionSymbols[':'] = '156';
BrailleConverter.DictionaryContractionSymbols['$'] = '1246';
BrailleConverter.DictionaryContractionSymbols[']'] = '12456';
BrailleConverter.DictionaryContractionSymbols['\\'] = '1256';
BrailleConverter.DictionaryContractionSymbols['['] = '246';
BrailleConverter.DictionaryContractionSymbols['!'] = '2346';
BrailleConverter.DictionaryContractionSymbols['/'] = '34';
BrailleConverter.DictionaryContractionSymbols['+'] = '346';
BrailleConverter.DictionaryContractionSymbols['>'] = '345';
BrailleConverter.DictionaryContractionSymbols['\"'] = '3';
BrailleConverter.DictionaryContractionSymbols['@'] = '4';
BrailleConverter.DictionaryContractionSymbols['^'] = '45';
BrailleConverter.DictionaryContractionSymbols['_'] = '456';
BrailleConverter.DictionaryContractionSymbols['\''] = '5';
BrailleConverter.DictionaryContractionSymbols[';'] = '56';
BrailleConverter.DictionaryContractionSymbols['1'] = '2';
BrailleConverter.DictionaryContractionSymbols['2'] = '23';
BrailleConverter.DictionaryContractionSymbols['3'] = '25';
BrailleConverter.DictionaryContractionSymbols['4'] = '256';
BrailleConverter.DictionaryContractionSymbols['5'] = '26';
BrailleConverter.DictionaryContractionSymbols['6'] = '235';
BrailleConverter.DictionaryContractionSymbols['7'] = '2356';
BrailleConverter.DictionaryContractionSymbols['8'] = '236';
BrailleConverter.DictionaryContractionSymbols['9'] = '35';
BrailleConverter.DictionaryContractionSymbols['0'] = '356';

//dictionarytable is a hashtable of all of grade2dictionary.txt
BrailleConverter.DictionaryTable = {};

BrailleConverter.isSupported = function(latinString) {

	if(!(typeof latinString == "string" || latinString instanceof String)) {

		throw Messages.BAD_TYPE;

	}

	latinString = latinString.toLowerCase();

	for(var i=0;i<latinString.length;i++) {

		var c = latinString.substr(i,1);

		if(typeof BrailleConverter.BrailleTable[c] == 'undefined') {

			console.log("'" + c + "'");

			return false;

		}

	}

	return true;

}

/*
argument is in the form of a string of digits 1-8 that correspond to the
braille dots used in the unicode character to be returned
returned value is a base 10 number representing the index in unicode

NOTE: JS uses the base 16 representation of this number for special characters and HTML uses
base 10
*/
BrailleConverter.getUnicodeIndexFromBrailleLetter = function(brailleLetter) {

	console.log("braille letter = " + brailleLetter);

	/*
	brailleIndex is the relative position of the braille character in unicode.
	These characters are in an incrementing order such that the character at
	index 0 is blank, index 1 has dot 1, index 2 has dot 2, index 3 has dots 1
	and 2, index 4 has dot 3 and so on.
	This allows us to calculate the index of the correct braille character by
	taking the sum of 2^(dot-1) for each dot.
	*/
	var brailleIndex = 0;

	/*
	dotpresent is an array of boolean values where index 0 corresponds to
	dot 1 and index 5 corresponds to dot 6 the "extra" values are for 8 dot braille
	these values are false if the dot is not yet present in the string, this
	is to prevent repeated digits from screwing up our total and pointing
	to a random unicode character we don't want (duplicate digits are simply
	ignored)
	*/
	var dotPresent = [false, false, false, false, false, false, false, false];
	
	for(var i=0;i<brailleLetter.length;i++) {
			
		var dotValue = parseInt(brailleLetter.substring(i,i+1),10);

		/*
		we throw out digits greater than 8 instead of 6 because there is
		8 dot braille in unicode which could be used in dictionaries
		specified by the user, 8 dot braille follows the same index convention as 6
		dot braille so we don't have to worry about changing our method
		*/
		if(!dotPresent[dotValue-1] || dotValue > 8) {
			brailleIndex += Math.pow(2,dotValue-1);
			dotPresent[dotValue-1] = true;
		}else {
			throw dotValue + " is either a repeated digit, greater than 8 or invalid";
		}
			
	}

	//this is the absolute position of the correct character in unicode
	var unicodeIndex = brailleIndex + BrailleConverter.UNICODE_BRAILLE_START;
	
	return unicodeIndex;	

};

/*
accepts arguments in the form of a string consisting of the digits 1-8
converts to the proper HTML format for the corresponding braille unicode character

WARNING: Due to the way Firefox looks for the unicode escape character you
must set the innerHTML of a text area to the HTML representation of the
characters and then set the value of the text area equal to its innerHTML
*/
BrailleConverter.getUnicodeHTMLFromBrailleLetter = function(brailleLetter) {

	console.log("get unicode HtML braille letter = " + brailleLetter);

	var unicodeIndex = BrailleConverter.getUnicodeIndexFromBrailleLetter(brailleLetter);

	//adds HTML unicode formating
	return "&#" + unicodeIndex + ";";

};

/*
accepts input in the form of space seperated strings of digits 1-8 and
fetches the HTML that refers to the correct braille unicode characters
for the word which is returned as a string
*/
BrailleConverter.getUnicodeHTMLFromBrailleWord = function(brailleWord) {

	console.log("get unicode HTML from braille word braille word = " + brailleWord);

	var bwArray = brailleWord.split(" ");
	var unicodeHTMLword = "";

	for(var i=0;i<bwArray.length;i++) {

		console.log("get unicode HTML from braille word braille letter = " + bwArray[i]);
		unicodeHTMLword += BrailleConverter.getUnicodeHTMLFromBrailleLetter(bwArray[i]);

	}

	return unicodeHTMLword;

};

/*
accepts arguments in the form of HTML representations of unicode characters
returns a string with the JS representations of those unicode characters
all other formatting and characters may be preserved but do not rely on it
the workaroundID argument is an optional parameter that will use a new ID
for the inserted span tag in case of a conflict with the default ID

The span tag is inserted because of how Firefox looks for the unicode escape
character
*/
BrailleConverter.HTMLunicodeToJSString = function(HTMLUnicodeString, workaroundID) {

	//the id for the span tag we are going to insert into the web page
	workaroundID = workaroundID || "brailleConverterWorkaround";

	//checks to see if span tag has been created before
	if(document.getElementById(workaroundID) === null) {

		//creates and hides span tag at the very end of the body
		var workaround = document.createElement("span");
		workaround.style.display = "none";
		workaround.id = workaroundID;

		document.body.appendChild(workaround);

	}

	//stores the HTML encoded unicode to the hidden span tag
	document.getElementById(workaroundID).innerHTML = HTMLUnicodeString;

	/* when we retreive the HTML encoded unicode from the web page JS will
	automagically convert it. No other solution has been found*/
	return document.getElementById(workaroundID).innerHTML;

};

/*converts a string of space seperated digits 1-8 to their braille
representations and returns it as a JS string*/
BrailleConverter.brailleWordToJSString = function(brailleWord) {

	console.log("braille word to js string braille word = " + brailleWord);

	//simple combination of two other conversion functions
	var unicodeHTML = BrailleConverter.getUnicodeHTMLFromBrailleWord(brailleWord);
	return BrailleConverter.HTMLunicodeToJSString(unicodeHTML);

};

/*
accepts arguments in the form of a string of latin characters and a second
optional argument that specifies the grade

grade 1 is assumed if no grade is provided
*/
BrailleConverter.latinAlphabetToBraille = function(latinString,grade) {

	//assume grade 1 unless otherwise specified
	grade = grade || 1;

	//TODO at some point try and move more of this into separate functions
	if(grade === 1) {

		//braille has indicators that cause characters to change from corresponding to a-j to the digits 1-0
		//mode keeps track of the last indicator used, this is assumed to start with alpha
		var mode = "alpha";
		//braille has the capital word signifier which works like capslock on a keyboard
		var capslock = false;
		var brailleWord = "";

		for(var i=0;i<latinString.length;i++) {

			//analyse the string character by character
			var c = latinString.substr(i,1);

			//all entries on BrailleConverter.BrailleTable don't have a space at the end so you have to add it for them
			if(i!= 0) {

				brailleWord += " ";

			}

			switch(BrailleConverter.getLatinCharacterType(c)) {

				case BrailleConverter.TYPE_NUMBER:
					if(mode === "alpha") {
					
						brailleWord += BrailleConverter.BrailleSpecialCharacters.numberIndicator + " ";
						mode = "num";

					}
					if(capslock) {
						capslock = false;
					}
					brailleWord += BrailleConverter.BrailleTable[c];
					break;
				case BrailleConverter.TYPE_SPECIAL:
					
					//capital word indicator is terminated by special characters
					capslock = false;
					brailleWord += BrailleConverter.BrailleTable[c];
					break;
				case BrailleConverter.TYPE_UNKNOWN:
				
					/*
					in the case of a type_unkown insert a dash which in
					braille shows an ommission

					we can't know if caps are supposed to be terminated
					before or after so leave them on
					*/
					
					console.log("=== UNKNOWN ===");

					brailleWord += BrailleConverter.BrailleTable['__'];
					break;
				case BrailleConverter.TYPE_LOWER:
					
					//it should be logically impossible for both num and capslock to be on at the same time
					//don't put them into an if else though just in case there is a logic error
					if(mode === "num") {
						mode = "alpha";
						//grade 1 indicator is used to go from numbers back to lower case
						brailleWord += BrailleConverter.BrailleSpecialCharacters.grade1Indicator + " "; 
					}
					//if capslock is still on, turn it off
					if(capslock) {
						brailleWord += BrailleConverter.BrailleSpecialCharacters.capitalTerminator + " ";
						capslock = false;
					}

					brailleWord += BrailleConverter.BrailleTable[c];
					break;
				case BrailleConverter.TYPE_UPPER:
					if(mode === "num") {
						mode = "alpha";
						//don't put a grade 1 indictaor because it is only used to indicate lower case
						//the correct capital indicator will be checked later on
					}
					if(capslock) {
						brailleWord += BrailleConverter.BrailleTable[c.toLowerCase()];
					}else {
						//check if this is the very last character
						if(i != latinString.length - 1) {
							//check if the character to the right is capital
							if(BrailleConverter.getLatinCharacterType(latinString.substr(i+1,1)) != BrailleConverter.TYPE_UPPER) {

								brailleWord += BrailleConverter.BrailleSpecialCharacters.capitalIndicator + " ";
								brailleWord += BrailleConverter.BrailleTable[c.toLowerCase()];

							}else {

								brailleWord += BrailleConverter.BrailleSpecialCharacters.capitalWord + " ";
								brailleWord += BrailleConverter.BrailleTable[c.toLowerCase()];
								capslock = true;

							}
						}else {

							brailleWord += BrailleConverter.BrailleSpecialCharacters.capitalIndicator + " ";
							brailleWord += BrailleConverter.BrailleTable[c.toLowerCase()];

						}
					}
					
					break;

			}

		}

	return brailleWord;
	
	}else if(grade === 2) {

		var brailleWord = "";
		
		//split the latin string into each sepearate word
		var latinWordArray = latinString.split(" ");
		
		//iterate across each word
		for(var i=0;i<latinWordArray.length;i++) {
						
			//add spaces between words
			if(i != 0) {
				
				brailleWord += "  ";
				
			}
			
			//check if the word is in the grade 2 dictionary
						
			if(BrailleConverter.DictionaryTable[latinWordArray[i]]) {
				
				var dictionaryEntry = BrailleConverter.DictionaryTable[latinWordArray[i]];
				
				//iterate through every character
				for(var j=0;j<dictionaryEntry.length;j++) {
					
					//add spaces between braille characters;
					if(j != 0) {
					
						brailleWord += " ";
					
					}
					
					var c = dictionaryEntry.substr(j,1);
					//if the character is caseless then it is a symbol for a contraction
					if(c.toLowerCase() === c && c.toUpperCase() === c) {
						
						brailleWord += BrailleConverter.DictionaryContractionSymbols[c];
						
					}else {
						
						brailleWord += BrailleConverter.BrailleTable[c];
						
					}
					
				}
				
			}else {
				//word isn't in the dictionary, try grade 2 transcription
				//TODO pseudo grade 2 transcription
				
				//for now just use grade 1 transcription

				brailleWord += BrailleConverter.latinAlphabetToBraille(latinWordArray[i],1);
			
			}
			
		}
		
		return brailleWord;

	}


};

//this function takes a single character and returns the relevant BrailleConverter.TYPE
BrailleConverter.getLatinCharacterType = function (c) {

	if(c.length != 1) {
		
		throw "can't get character type for more or fewer than one character";
		
	}

	if(typeof BrailleConverter.BrailleTable[c] == 'undefined') {

		return BrailleConverter.TYPE_UNKNOWN;

	}

	var reContainsNumbers = /[0-9]/;
	
	//checks for caseless characters like numbers and special characters
	if(c === c.toLowerCase() && c === c.toUpperCase()) {

		//searches if there are any digits 0-9
		if(reContainsNumbers.test(c)) {

			return BrailleConverter.TYPE_NUMBER;

		}else {

			//returns undefined if the character isn't in braille table
			if(BrailleConverter.BrailleTable[c] === undefined) {

				return BrailleConverter.TYPE_UNKNOWN;

			}else {

				return BrailleConverter.TYPE_SPECIAL;

			}

		}

	}else if(c === c.toLowerCase()) {

		return BrailleConverter.TYPE_LOWER;

	}else if(c === c.toUpperCase()) {

		return BrailleConverter.TYPE_UPPER;

	}
	

};

/*
accepts an argument in the form of a latin word and returns a string containing the transcribed braille characters
also accepts an optional argument for the grade to use to transcribe the string, defaults to 1
*/
BrailleConverter.latinWordToJSString = function(latinWord,grade) {

	console.log("latin word to js string latin word = " + latinWord);
	console.log("latin word to js string grade = " + grade);

	grade = grade || 1;

	var brailleWord = BrailleConverter.latinAlphabetToBraille(latinWord,grade);
	
	return BrailleConverter.brailleWordToJSString(brailleWord);
	
};


/*
loads data into the grade 2 dictionary
must use AJAX as there isn't any other way to get the data from the .txt
*/
BrailleConverter.loadGrade2Dictionary = function() {

	var xmlhttp;

	xmlhttp = new XMLHttpRequest();

	//function will be called multiple times whenever the dictionary is attempted to be loaded
	xmlhttp.onreadystatechange = function() {

		//check if the request is done
		if (xmlhttp.readyState == XMLHttpRequest.DONE) {

			//did everything go alright?
			//200 means everything went alright
			if(xmlhttp.status == 200) {
			   
				//split based upon the lines in the original text file
				//not quite sure how well this works cross OS
				var dictionaryData = xmlhttp.responseText.split("\n");
			   
				//iterate along every entry
				for(var i = 0;i<dictionaryData.length;i++) {
				   
					//remove spaces at end of the line
					var line = dictionaryData[i].substring(0,dictionaryData[i].indexOf(" "));
				   
					//get the latin word
					var key = line.substring(0,dictionaryData[i].indexOf("\t"));
				   
					//get the dictionary entry for the given word
					var value = line.substring(dictionaryData[i].indexOf("\t") + 1);
					BrailleConverter.DictionaryTable[key] = value;
			  
				}
           
			}else {
           
				throw BrailleConverter.G2_FAILED_TO_LOAD + '|Error ' + xmlhttp.status;
           
			}
        
		}
	  
	};

	//set up the xml request
	xmlhttp.open(BrailleConverter.G2_REQUEST_METHOD, BrailleConverter.G2_DICT_PATH, true);
	
	xmlhttp.send();

};
BrailleConverter.loadGrade2Dictionary();
