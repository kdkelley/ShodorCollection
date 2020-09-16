/*
UserDictionaryEntry is used internally in UserDictionary as a convinent data storage object
*/
function UserDictionaryEntry(latin,braille) {

	//latin and braille hold latin and braille strings in JS format
	//setters can be added for latin and braille if needed
	var latin = latin;
	var braille = braille;
	
	this.getLatin = function() {
		return latin;
	}
	
	this.getBraille = function() {
		return braille;
	}

}
