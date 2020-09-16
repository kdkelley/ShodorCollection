var initx;
var inity;
var newObjectMass = 1;
var velDamp = 100;

function onMouseUp(event) {

	var xPrime = event.pageX;
	var yPrime = event.pageY;
	var newVel = new Vector((xPrime - initx) / velDamp, (yPrime - inity) / velDamp);

	var newObj = new GravityObject(initx - 10, inity - 10, newObjectMass, newVel);

	if(document.getElementById('fixed').checked) {

		newObj.setFixed(true);
		document.getElementById('fixed').checked = false;

	}

	objectList.push(newObj);

}

function onMouseDown(event) {

	//event = canvas.relMouseCoords(event);

	initx = event.pageX;
	inity = event.pageY;

	//objectList.push(new GravityObject(x,y,newObjectMass, new Vector(0,0)));

}

function relMouseCoords(event) {

	var totalOffsetX = 0;
	var totalOffsetY = 0;
	var canvasX = 0;
	var canvasY = 0;
	var currentElement = this;

	do{ 

		totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
		totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;

	}
	while(currentElement = currentElement.offsetParent)

	canvasX = event.pageX - totalOffsetX;
	canvasY = event.pageY - totalOffsetY;

	return {x:canvasX, y:canvasY};

}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

function setNewObjectMass(n) {

	newObjectMass = n;
	document.getElementById('massDisp').value = n;

}
