Messages = {};

Messages.NOT_DEF = "is not defined";
Messages.CORRECT = "correct";
Messages.INCORRECT = "incorrect";
Messages.INDEX_TOO_LARGE = "index is larger than the number of entries";
Messages.INDEX_TOO_SMALL = "index is smaller than number of entries";
Messages.MULTIPLE_FILES = "multiple files were uploaded";
Messages.DICT_NOT_LOADED = "the dictionary is not loaded";
Messages.CURRENT_WORD_EXISTS = "there is already a current word";
Messages.NO_DATA = "Not Enough Data";
Messages.INVALID_GRADE = "invalid grade, must be either 1 or 2";
Messages.MAX_LENGTH_TOO_SMALL = "there are no entries smaller than max length"
Messages.BAD_TYPE = "bad type error"
Messages.BAD_ID = "no element with that id exists"
Messages.BAD_DATA = "bad/malformed data"
Messages.UNSUPPORTED_CHAR = "unsupported character"

//constants containing all ids relevant to the operation of braille flashcards
Ids = {};
Ids.BRAILLE_OUT = "brailleOutput";
Ids.DOT_PATTERN = "dotPattern";
Ids.CORRECT_ANSWER = "answer";
Ids.CURRENT_SCORE = "score";
Ids.ALERTS = "alert";
Ids.USER_GUESS = "userGuess";
Ids.BRAILLE_GRADE = "grade";
Ids.MAX_WORD_LENGTH = "maxWordLength";
Ids.CUSTOM_WORD_ENTRY = "customWordEntry";
Ids.UD1_LOADER = "dictionary1Loader";
Ids.UD2_LOADER = "dictionary2Loader";
Ids.AUDIO_CORRECT = "correctAudio";
Ids.AUDIO_INCORRECT = "incorrectAudio";
Ids.BUTTON_NEW_WORD = "newWordButton";
Ids.BUTTON_CHECK_GUESS = "checkGuess";
Ids.AUDIO_DROPDOWN = "audioSelector";
Ids.BUTTON_CUSTOM_WORD = "useCustomWord";

//contain lists of Ids which will be triggered on a given event
//keep empty arrays as the lists will still be called and need to be definied to avoid errors
Ids.DISABLE_ON_START = [Ids.BUTTON_NEW_WORD, Ids.BUTTON_CHECK_GUESS, Ids.USER_GUESS];

//enabled whenever the currently selected grade has a relevant dictionary loaded
Ids.ENABLE_ON_DICTIONARY_LOAD = [Ids.BUTTON_NEW_WORD];

//changes when a new word is made, use to disable all inputs that are irrelevant while selecting a new word
Ids.ENABLE_ON_NEW_WORD = [Ids.BUTTON_CHECK_GUESS, Ids.USER_GUESS];
Ids.DISABLE_ON_NEW_WORD = [Ids.BUTTON_NEW_WORD, Ids.BUTTON_CUSTOM_WORD, Ids.CUSTOM_WORD_ENTRY, Ids.BRAILLE_GRADE];
Ids.CLEAR_ON_NEW_WORD = [Ids.CORRECT_ANSWER, Ids.BRAILLE_OUT, Ids.USER_GUESS];

//changes when the user guesses a word correctly, should roughly be an inverse of the new word fields, kept separate for future convenience
Ids.ENABLE_ON_GUESS = [Ids.BUTTON_NEW_WORD, Ids.BUTTON_CUSTOM_WORD, Ids.CUSTOM_WORD_ENTRY, Ids.BRAILLE_GRADE];
Ids.DISABLE_ON_GUESS = [Ids.BUTTON_CHECK_GUESS];
Ids.CLEAR_ON_GUESS = [Ids.CUSTOM_WORD_ENTRY, Ids.CUSTOM_WORD_ENTRY];

Classes = {};
Classes.HIDDEN = "hidden";
