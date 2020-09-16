FileIO = {};

/*
upload dictionary handles all of the taking the data from a file
for uploading a user dictionary, it doesn't deal with actually
sorting that data into a dictionary

remember that uploadElement is a reference to the element on the webpage itself
it can be invoked using 'this' in the HTML
*/
FileIO.uploadDictionary = function(uploadElement, UD, grade) {

	//only one file should be uploaded
	if(uploadElement.files.length != 1) {

		throw Messages.MULTIPLE_FILES;

	}

	//grab the file from uploadElement
	var file = uploadElement.files[0];
	var fileString;

	var reader = new FileReader();

	reader.onload = function(event) {

		fileString = reader.result;
		UD.loadFromString(fileString, grade);

		if(Flashcards.getCurrentDictionary().isLoaded()) {
	
			Form.setDisabled(Ids.ENABLE_ON_DICTIONARY_LOAD, false);

			if(Flashcards.grade != grade) {

				Form.setDisabled([Ids.BUTTON_NEW_WORD], true);

			}

			Form.setFocus(Ids.BUTTON_NEW_WORD);
	
		}

	}

	//causes reader to do stuff, triggering onload
	//keep in mind this is async so you can't assume onload has run after this line
	reader.readAsText(file);

	//disable the appropriate fields
	//Ids is defined in js/Const.js
	

}

/*
in theory this method is used to cause the user to start a download of [filename].txt which
should contain string in the body of the document

currently has extremely wonky behavior

no real point is doing this, the user has to have specified the dictionary anyway
*/
FileIO.downloadString = function(string, filename) {

	//right now the best method to use as text blob as in theory it has the most universal support
	//TODO gonna work on getting some library which actually has universal support to replace all this
	var textBlob = new Blob([text], {
		type: 'text/plain'
	});

	//we are creating a download "link" and then we are going to use JS to 'click' it.
	var download = document.createElement("a");
	download.download = filename;
	download.innerHTML = "Download";

	//through some magic voodoo process this is supposed to support additional browsers somehow
	if(true) {
		download.href = window.URL.createObjectURL(textBlob);
		download.target = "_blank";
	}else {
		download.href = window.URL.createObjectURL(textBlob);
		download.target = "_blank";
		download.onclick = destroyClickedElement;
		download.style.display = "none";
		document.body.appendChild(download);
	}

	//virtual click our download link
	download.click();

}

FileIO.executeFunctionByName = function(fName, ctx, args) {

	var args = args;
	var nameParts = fName.split(".");
	var f = nameParts.pop();

	for(var i=0;i<nameParts.length;i++) {

		ctx = ctx[nameParts[i]];

	}

	return ctx[f].apply(ctx, args);

}

FileIO.getVariableByName = function(vName, ctx) {

	var nameParts = vName.split(".");
	var v = nameParts.pop();

	for(var i=0;i<nameParts.length;i++) {

		ctx = ctx[nameParts[i]];

	}

	return ctx[v];

}
