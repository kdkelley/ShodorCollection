function degToRad(n) {

	return n / 57.2957795;

}

function radToDeg(n) {

	return n * 57.2957795;

}

function distanceBetween(x1,y1,x2,y2) {

	var dx = x1 - x2;
	var dy = y1 - y2;

	return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

}

function thetaBetween(x1, y1, x2, y2) {

	return (Math.atan2(x2-x1,y2-y1));

}

function clearObjects() {

	objectList = [];

}

function cleanObjects() {

	for(var i=0;i<objectList.length;i++) {

		if(objectList[i].x < 0 || objectList[i].y < 0 || objectList[i].x > canvas.width || objectList[i].y > canvas.height || objectList[i].mass == 1) {

			objectList.splice(i,1);

		}

	}

}
