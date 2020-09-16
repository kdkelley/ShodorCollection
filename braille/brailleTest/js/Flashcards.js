//Flashcards object contains all the actual application logic
Flashcards = {};

Flashcards.grade = 1;
Flashcards.UDgrade1 = new UserDictionary();
Flashcards.UDgrade2 = new UserDictionary();
Flashcards.currentWord;
Flashcards.scoreEnabled = true;

/*
setGrade provides additional verification that grade is 1 or 2
ideally newGrade should always be Form.getGrade();

this should be called instead of setting grade
*/
Flashcards.updateGrade = function() {

	Form.updateGrade();
	newGrade = parseInt($('#' + Ids.BRAILLE_GRADE)[0].value,10);

	if(newGrade === 1 || newGrade === 2) {

		Flashcards.grade = newGrade;

	}else {

		throw Messages.INVALID_GRADE;

	}

	if((Flashcards.grade == 1 && !Flashcards.UDgrade1.isLoaded()) || (Flashcards.grade == 2 && !Flashcards.UDgrade2.isLoaded())) {

		Form.setDisabled(Ids.ENABLE_ON_DICTIONARY_LOAD, true);

	}else {

		Form.setDisabled(Ids.ENABLE_ON_DICTIONARY_LOAD, false);

	}

}

/*
this is called at body.onload, it should be used to initialize everything that requires the HTML
to be garunteed to have loaded
*/
Flashcards.init = function() {

	Hotkeys.initHotkeysOnElement("body");
	Hotkeys.initHotkeysOnElement("#" + Ids.UD1_LOADER);
	Hotkeys.initHotkeysOnElement("#" + Ids.UD2_LOADER);
	Hotkeys.initHotkeysOnElement("#" + Ids.USER_GUESS);
	Hotkeys.initHotkeysOnElement("#" + Ids.CUSTOM_WORD_ENTRY);

	Form.updateScore();
	Form.setDisabled(Ids.DISABLE_ON_START, true);

	for(var i=0;i<Audio.options.length;i++) {

		document.getElementById(Ids.AUDIO_DROPDOWN).appendChild(Audio.options[i].getOptionHTML());

	}

}

/*
generates a new word from whatever the current grade dictionary is and displays it properly
*/
Flashcards.newWord = function(customWord) {

	if(!customWord) {

		customWord = false;

	}

	var dict;

	if(customWord) {

		var custWordLatin = Form.getCustomWord();
		var custWordBraille = BrailleConverter.latinWordToJSString(custWordLatin, Flashcards.grade);

		Flashcards.currentWord = new UserDictionaryEntry(custWordLatin, custWordBraille);

	}else {

		switch(Flashcards.grade) {

			case 1:
				dict = Flashcards.UDgrade1;
				break;
			case 2:
				dict = Flashcards.UDgrade2;
				break;

		}

		//if there is already a current word or the dictionary is not loaded, throw an error
		if(!dict.isLoaded() || Flashcards.currentWord) {

			if(!dict.isLoaded()) {

				throw Messages.DICT_NOT_LOADED;

			}else {

				throw Messages.CURRENT_WORD_EXISTS;

			}

		}

		//get the max word length, it only needs to be retrieved when we are going to get a new random word
		var maxWordLen = Form.getMaxWordLength();
		
		try {
	
			dict.getRandomEntry(maxWordLen);

			Flashcards.currentWord = dict.getRandomEntry(maxWordLen);

		}
		catch(e) {

			//console.log(e);

			Form.addAlert(e);

		}

	}

	//set fields to proper enabled/disabled states
	Form.setDisabled(Ids.ENABLE_ON_NEW_WORD, false);
	Form.setDisabled(Ids.DISABLE_ON_NEW_WORD, true);
	
	//reset relevant fields
	Form.resetFields(Ids.CLEAR_ON_NEW_WORD);
	
	//set specific field values

	Form.setBrailleOut(Flashcards.currentWord.getBraille());
	Form.setFocus(Ids.USER_GUESS);

}

/*
used when the user gives up attempting to guess

implemented just to make life easier should giving up ever matter later on
*/
Flashcards.giveUp = function() {

	this.Scoreboard.markWrong();

}

Flashcards.getCurrentDictionary = function() {

	if(Flashcards.grade == 1) {

		return Flashcards.UDgrade1;

	}else if(Flashcards.grade == 2) {

		return Flashcards.UDgrade2;

	}

}

/*
takes the current word from the form and compares it to the correct answer

automatically updates the scoreboard as well
*/
Flashcards.guessCurrentWord = function() {

	if(!Flashcards.currentWord) {

		throw 'current word ' + Messages.NOT_DEF;

	}

	//trim trailing whitespace from user guess
	var userGuess = Form.getUserGuess().trim();

	//correct disable/enable stuff
	Form.setDisabled(Ids.ENABLE_ON_GUESS, false);
	Form.setDisabled(Ids.DISABLE_ON_GUESS, true);

	if(Flashcards.grade == 1 && !Flashcards.UDgrade1.isLoaded()) {

		console.log("yo");
		Form.setDisabled(Ids.DISABLE_ON_START, true);

	}else if(Flashcards.grade == 2 && !Flashcards.UDgrade2.isLoaded()){

		Form.setDisabled(Ids.DISABLE_ON_START, true);

	}else {

		Form.setFocus(Ids.BUTTON_NEW_WORD);

	}

	//keep in mind fields cleared won't be visible to the user for comparison
	Form.resetFields(Ids.CLEAR_ON_GUESS);

	//check if user got the flashcard right
	if(userGuess == Flashcards.currentWord.getLatin()) {

		this.Scoreboard.markRight();

	}else {

		this.Scoreboard.markWrong();

	}

	//simplest way to make sure that currentWord resets properly
	this.currentWord = undefined;

}

/*
member of Flashcards, used to track appropriate scoring

interfaces only with Form
*/
function Scoreboard() {

	var totalQuestions;
	var rightAnswers;

	/*
	returns JSformatted score string for display to the user

	automatically invoked in init, default message will always be default content of the score field
	*/
	this.getScoreString = function() {

		if(totalQuestions == 0) {

			return Messages.NO_DATA;

		}

		//just calculating the score
		var fractionRight = rightAnswers / totalQuestions;
		var percentRight = fractionRight * 100;
		percentRight = Math.round(percentRight);

		var fractionString = rightAnswers + "/" + totalQuestions;

		var scoreString = fractionString + " (" + percentRight + "%)";

		return scoreString;

	}

	/*
	called by both markWrong and markRight
	prevents code duplication between markWrong and markRight
	*/
	var mark = function() {

		//reveal the correct answer
		Form.setCorrectAnswer(Flashcards.currentWord.getLatin());
		totalQuestions += 1;
		Form.updateScore();

	}

	/*
	called whenever the scoreboard adds an incorrect response
	*/
	this.markWrong = function() {

		Audio.playSoundById(Ids.AUDIO_INCORRECT);
		mark();

	}

	/*
	called whenever the scoreboard adds a correct response
	*/
	this.markRight = function() {

		rightAnswers += 1;
		Audio.playSoundById(Ids.AUDIO_CORRECT);
		mark();

	}

	/*
	called to clear the current state of the scoreboard
	*/
	this.clear = function() {

		totalQuestions = 0;
		rightAnswers = 0;
		Form.updateScore();

	}
	this.clear();

}
Flashcards.Scoreboard = new Scoreboard();
