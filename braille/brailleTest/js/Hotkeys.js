//constants contianing all shortcuts
Hotkeys = {};
//event type to be used for all hotkeys
Hotkeys.EVENT_TYPE = "keydown";
Hotkeys.LOAD_UD1 = "alt+1";
Hotkeys.LOAD_UD2 = "alt+2";
Hotkeys.SAVE_UD1 = "shift+1";
Hotkeys.SAVE_UD2 = "shift+2";
Hotkeys.NEW_WORD = "alt+n";
Hotkeys.LOAD_CUSTOM_CORRECT_SOUND = "shift+[";
Hotkeys.LOAD_CUSTOM_INCORRECT_SOUND = "shift+]";
Hotkeys.SELECT_ANSWER_FIELD = "alt+a";
Hotkeys.SELECT_CUSTOM_WORD = "alt+s";
Hotkeys.CLEAR_CUSTOM_WORD = "alt+c";
Hotkeys.SHOW_WORD = "alt+w";
Hotkeys.SHOW_DOT_PATTERN = "alt+d";
Hotkeys.FOCUS_GRADE = "alt+g";
Hotkeys.FOCUS_MAX_WORD_LENGTH = "alt+l";
Hotkeys.SUBMIT = "return";

Hotkeys.initHotkeysOnElement = function(element) {

	/*

	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.SUBMIT, function(e) {

		var onSubmitString = $(document.activeElement).data("onsubmit");

		if(onSubmitString) {

			var openParensPos = onSubmitString.indexOf("(");
			var closeParensPos = onSubmitString.indexOf(")");

			var funcString = onSubmitString.substr(0,openParensPos);
			var argString = onSubmitString.substr(openParensPos + 1, closeParensPos - openParensPos - 1);

			var rawArgs = argString.split(",");
			var args = [];

			for(var i=0;i<rawArgs.length;i++) {

				args.push(FileIO.getVariableByName(rawArgs[i], window));

			}

			FileIO.executeFunctionByName(funcString, window, args);

		}

	});

	/*
	load user dictionary 1
	unfortunately it is not possible to trigger the file menu from JS
	instead we are just going to focus the UD1 file input
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.LOAD_UD1,function(){
	
		//load dictionary 1
		$("#" + Ids.UD1_LOADER).focus();
		return false;

	});

	/*
	load user dictionary 2
	unfortunately it is not possible to trigger the file menu from JS
	instead we are just going to focus the UD1 file input
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.LOAD_UD2,function(){

		//load dictionary 2
		$("#" + Ids.UD2_LOADER).focus();
		return false;

	});

	/*
	save user dictionary 1 to disk
	unfortunately there isn't any good way to download a file universally across all browsers
	TODO find some library for this
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.SAVE_UD1,function(){

		//save grade 1 dictionary to .txt file
		return false;

	});

	/*
	save user dictionary 2 to disk
	unfortunately there isn't any good way to download a file universally across all browsers
	TODO find some library for this
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.SAVE_UD2,function(e){

		//var blob = new Blob([UDgrade2.getOriginalText()], {type: "text/plain;charset=utf-8"});
		//saveAs(blob,"hello world.txt");
		stringDownload(UDgrade2.getOriginalText(), "hello world.txt");

		//save grade 2 dictionary to .txt file
		return false;

	});

	/*
	upload a custom user sound effect, if this is even possible to implement correctly requires further research
	TODO figure out how to do this
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.LOAD_CUSTOM_CORRECT_SOUND,function(){

		//upload custom correct sound effect
		return false;

	});

	/*
	upload a custom user sound effect, if this is even possible to implement correctly requires further research
	TODO figure out how to do this
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.LOAD_CUSTOM_INCORRECT_SOUND,function(){

		//upload custom incorrect sound effect
		return false;

	});

	/*
	start a new word
	TODO impliment this
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.NEW_WORD,function(){

		//start a new word
		//disable timer
		//generate new word
		//show dot pattern as text
		//set focus to dot pattern field
		return false;

	});
	
	/*
	focus the field where the user types in their answer
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.SELECT_ANSWER_FIELD,function(){

		//focus the answer field
		//enter in the answer field scores response
		$('#' + Ids.USER_GUESS).focus();
		return false;

	});

	/*
	focus the custom word entry box
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.SELECT_CUSTOM_WORD,function(){

		$('#' + Ids.CUSTOM_WORD_ENTRY);
		//focus custom word entry
		return false;

	});

	/*
	clear the custom word box, go back to getting words from dictionary
	TODO impliment custom words and this function
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.CLEAR_CUSTOM_WORD,function(){

		//clear custom word entry
		//go back to generating words from dictionary
		return false;

	});
	
	/*
	give up on guessing the current word
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.SHOW_WORD,function(){


		//show the latin representation of the currently being read word
		//count the word as wrong
		Flashcards.giveUp();
		
		//focus latin representation
		return false;

	});
	
	/*
	focus the dot pattern field
	TODO impliment the dot pattern field
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.SHOW_DOT_PATTERN,function(){

		//show dot pattern
		//focus dot pattern
		return false;

	});

	/*
	focus the grade field
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.FOCUS_GRADE,function(){

		$('#' + Ids.BRAILLE_GRADE).focus();
		//focus braille grade
		return false;

	});

	/*
	focus the maximum word length field
	*/
	$(element).bind(Hotkeys.EVENT_TYPE, Hotkeys.FOCUS_MAX_WORD_LENGTH,function(){

		$('#' + Ids.MAX_WORD_LENGTH).focus();
		//focus field to set maximum word length
		return false;

	});
	
}
