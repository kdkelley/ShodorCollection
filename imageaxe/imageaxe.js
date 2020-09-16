function init() {

	document.getElementById('download').addEventListener('click', function() { for(i=0;i<3;i++) {downloadCanvas(this, 'output' + i, 'image' + i + '.png') };},false);

}

function downloadAllOutputs(link) {

	

}

function fetchImage() {

	  var imgFile = document.getElementById('submitfile');

	  if(imgFile.files && imgFile.files[0]) {

		  var reader = new FileReader();
		  reader.onload = function(event) {

			  var dataUri = event.target.result;
			  img = document.createElement("img");
			  img.src = dataUri;
			  imageAxe(img);

		  }

		reader.readAsDataURL(imgFile.files[0]);

	  }

}

function imageAxe(image) {

	for(i=0;i<3;i++) {

		choppingBlock = document.getElementById("output" + i);
		ctxt = choppingBlock.getContext("2d");
		choppingBlock.width = image.width / 3;
		choppingBlock.height = image.height;
		ctxt.drawImage(image,(image.width / 3) * i,0, image.width / 3, image.height,0,0,image.width / 3,image.height);
		
		downloadURL = choppingBlock.toDataURL();

		downloadURL = downloadURL.slice(downloadURL.indexOf(";"));

		downloadURL = "data:application/octet-stream" + downloadURL;

	}

}

function downloadCanvas(link, canvasId, filename) {

	link.href = document.getElementById(canvasId).toDataURL();
	link.download = filename;

}
