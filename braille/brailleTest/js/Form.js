Form = {};
Form.DEFAULT_MAX_WORD_LENGTH = 12;

/*
sets the value of the correct answer field to the given value
*/
Form.setCorrectAnswer = function(value) {

	$('#' + Ids.CORRECT_ANSWER)[0].value = value;

}

/*
grabs the custom word data given by the user

doesn't return an actual UserDictionaryEntry object
*/
Form.getCustomWord = function() {

	//consider dropping trim and using another whitespace solution
	return $('#' + Ids.CUSTOM_WORD_ENTRY)[0].value.trim();

}

/*
returns the value the user has currently typed into the user guess field
*/
Form.getUserGuess = function() {

	return $('#' + Ids.USER_GUESS)[0].value.trim();

}

/*
focus the element on the page with the given id
*/
Form.setFocus = function(id) {

	//this just makes sure something with id exists
	if($('#' + id).length == 0) {

		//consider removing the id and stuff if this neesds to be caught more easily
		throw id + "|" + Messages.BAD_ID;

	}

	$('#' + id)[0].focus();

}

/*
set the braille output to the given value

currently does no data validation, consider doing so
*/
Form.setBrailleOut = function(value) {

	$('#' + Ids.BRAILLE_OUT)[0].value = value;

}

/*
takes an array of ids as strings and sets their disabled property
to value

keep in mind this means that setDisabled(ids, false) will enable all ids
and that setDisabled(ids, true) will disabled all ids

now works if ids is actually just a single id
*/
Form.setDisabled = function(ids, value) {

	//basic data validation, if ids is just a string then it can be recovered
	if(!Array.isArray(ids)) {

		//instanceof is necessary to catch string objects
		if(typeof ids == 'string' || ids instanceof String) {

			//makes ids an array with only one entry, syntax looks a little odd
			ids = [ids];

		}else {

			throw Messages.BAD_TYPE;

		}

	}

	for(var i=0;i<ids.length;i++) {

		//this checks if the id exists anywhere
		if($('#' + ids[i]).length == 0) {

			//consider changing this if there is difficulty catching the error
			throw ids[i] + "|" + Messages.BAD_ID;

		}

		$('#' + ids[i])[0].disabled = value;

	}

}

/*
updates the alert field on the form

keep in mind that alerts will trigger the screenreader no matter what
(at least once aria-role='alert' is set)
so care should be taken to avoid excessive alerts

only works for messages that are strings, this is to prevent accidentally an object
*/
Form.addAlert = function(message) {

	if(!(typeof message == 'string' || message instanceof String)) {

		throw Messages.BAD_TYPE;

	}

	$("#" + Ids.ALERTS)[0].value = message

}

/*
takes the grade that the user provided and attempts to store
that value to Flashcards.grade.

defaults the grade to 1 if there is any problem with getting the value
*/
Form.updateGrade = function() {

	//grab the grade value
	var grade = parseInt($("#" + Ids.BRAILLE_GRADE)[0].value, 10);

	if(isNaN(grade) || (grade !== 1 && grade !== 2)) {

		Form.addAlert('invalid grade');
		grade = 1;
		$("#" + Ids.BRAILLE_GRADE)[0].value = grade;
		throw 'invalid grade';

	}	

	$("#" + Ids.BRAILLE_GRADE)[0].value = grade;

}

/*
updates the score displayed to the user
*/
Form.updateScore = function() {

	//check if scoreboard exists
	if(Flashcards.Scoreboard) {

		$('#' + Ids.CURRENT_SCORE)[0].value = Flashcards.Scoreboard.getScoreString();

	//check if the form exists
	}else if($('#' + Ids.CURRENT_SCORE)[0]) {

		$('#' + Ids.CURRENT_SCORE)[0].value = Messages.NO_DATA;

	//we can't do anything
	}else {

		return;

	}

}

/*
Called whenever the value of the max word length field changes

doesn't return anything, just makes sure the input is validated at all times
*/
Form.updateMaxWordLength = function() {

	//this is used because this function will "fix" the value in the field
	Form.getMaxWordLength();

}

/*
returns the value of the max word length field

also validates the max word length field and "fixes" the value if something is wrong with it
*/
Form.getMaxWordLength = function() {

	var length = parseInt($('#' + Ids.MAX_WORD_LENGTH)[0].value, 10);

	if(!isNaN(length)) {

		$('#' + Ids.MAX_WORD_LENGTH)[0].value = length;
		return length;

	}else {

		$('#' + Ids.MAX_WORD_LENGTH)[0].value = Form.DEFAULT_MAX_WORD_LENGTH;
		return Form.DEFAULT_MAX_WORD_LENGTH;

	}


}

/*
resetFields accepts an array of strings corresponding to the ids of fields
and sets the value of those fields to ""

resetFields will act on both value and innerHTML, depending on the value

now allows ids to be just a single string instead of an array of strings
*/
Form.resetFields = function(ids) {

	if(!Array.isArray(ids)) {

		if(typeof ids == 'string' || ids instanceof String) {

			//weird syntax but just makes ids an array with ids being the only entry
			ids = [ids];

		}else {

			throw Messages.BAD_TYPE; 

		}

	}

	for(var i=0;i<ids.length;i++) {

		if($('#' + ids[i]).length == 0) {

			throw Messages.BAD_ID;

		}

		var v = $('#' + ids[i])[0].value;

		//if the value is undefined then reset the innerHTML instead
		if(v) {

			$('#' + ids[i])[0].value = "";

		}else {

			$('#' + ids[i])[0].innerHTML = "";

		}

	}

}
