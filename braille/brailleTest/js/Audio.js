Audio = {};

Audio.DIR = "audio/";

//these have no relation to Audio.DIR, do not use Audio.DIR to replace "audio/"
Audio.WAV_TYPE = "audio/wav";
Audio.MP3_TYPE = "audio/mpeg"

Audio.WAV_ENDING = ".wav";
Audio.MP3_ENDING = ".mp3";

/*
Accepts an id and runs the play method on it
*/
Audio.playSoundById = function(soundId) {

	$('#' + soundId)[0].play();
	return true;

}

Audio.options = [];

function AudioOption(name, correctSoundName, incorrectSoundName) {

	var name = name;
	var correctSoundName = correctSoundName;
	var incorrectSoundName = incorrectSoundName;

	this.getName = function() {

		return name;

	}

	function getAudioElement(sourceName) {

		var aud = document.createElement("audio");
		
		var wav = document.createElement("source");
		wav.src = Audio.DIR + sourceName + Audio.WAV_ENDING;
		wav.type = Audio.WAV_TYPE;
		
		var mp3 = document.createElement("source");
		mp3.src = Audio.DIR + sourceName + Audio.MP3_ENDING;
		mp3.type = Audio.MP3_TYPE;

		aud.appendChild(wav);
		aud.appendChild(mp3);

		return aud;

	}

	this.activate = function() {

		var correctAudio = getAudioElement(correctSoundName);
		var incorrectAudio = getAudioElement(incorrectSoundName);

		var correctAudioElement = document.getElementById(Ids.AUDIO_CORRECT);
		var incorrectAudioElement = document.getElementById(Ids.AUDIO_INCORRECT);

		correctAudioElement.parentNode.removeChild(correctAudioElement);
		incorrectAudioElement.parentNode.removeChild(incorrectAudioElement);

		correctAudio.id = Ids.AUDIO_CORRECT;
		incorrectAudio.id = Ids.AUDIO_INCORRECT;

		correctAudio.class = Classes.HIDDEN;
		incorrectAudio.class = Classes.HIDDEN;

		document.body.appendChild(correctAudio);
		document.body.appendChild(incorrectAudio);

	}

	this.getOptionHTML = function() {

		var opt = document.createElement("option");
		opt.value = name;
		opt.appendChild(document.createTextNode(name));

		return opt;

	}

}

Audio.options.push(new AudioOption("Chimes", "chord","DingDong"));
Audio.options.push(new AudioOption("Voice", "Correct", "Incorrect"));
//this turns off the audio tones for right and wrong, it is kinda a hack
Audio.options.push(new AudioOption("None", "", ""));

Audio.switch = function(name) {

	console.log(name);

	for(var i=0;i<Audio.options.length;i++) {

		if(Audio.options[i].getName() === name) {

			Audio.options[i].activate();

		}

	}

}

/*
No reason to keep this around really
Audio.switchAudioTest = function() {

	var aud = document.createElement("audio");
	var wav= document.createElement("source");
	wav.src = "audio/Correct.wav";
	wav.type = "audio/wav";
	var mp3 = document.createElement("source");
	mp3.src = "audio/Correct.mp3";
	mp3.type = "audio/mpeg";

	aud.appendChild(wav);
	aud.appendChild(mp3);
	aud.controls = "";

	document.getElementById("correctAudio").parentNode.removeChild(document.getElementById("correctAudio"));

	aud.id = Ids.AUDIO_CORRECT;
	aud.class = Classes.HIDDEN;

	document.body.appendChild(aud);

}
*/
