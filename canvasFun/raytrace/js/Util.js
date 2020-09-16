function thetaBetween(p1, p2) {

	return (Math.atan2(p2.x-p1.x,p2.y-p1.y));

}

function productBetween(p1, p2) {

	var dx = p1.x - p2.x;
	var dy = p1.y - p2.y;

	return dx * dy;

}

function squareBetween(p1, p2) {

	var dx = p1.x - p2.x;
	var dy = p1.y - p2.y;

	return Math.pow(dx,2) + Math.pow(dy,2);

}

function distanceBetween(p1,p2) {

	var dx = p1.x - p2.x;
	var dy = p1.y - p2.y;

	return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

}

function degToRad(n) {

	return n / 57.2957795;

}

function radToDeg(n) {

	return n * 57.2957795;

}

function drawLine(p1, p2, color, ctx) {

	ctx.beginPath();
	ctx.moveTo(p1.x,p1.y);
	ctx.lineTo(p2.x,p2.y);
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.closePath();

}

function getLineIntersect(p1, p2, p3, p4) {

	var denom = ((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x));
	var pxnum = ((((p1.x * p2.y) - (p1.y * p2.x)) * (p3.x - p4.x)) - ((p1.x - p2.x) * ((p3.x * p4.y) - (p3.y * p4.x))));
	var px = pxnum/denom;

	var pynum = ((((p1.x * p2.y) - (p1.y * p2.x)) * (p3.y - p4.y)) - ((p1.y - p2.y) * ((p3.x * p4.y) - (p3.y * p4.x))));
	var py = pynum/denom;

	var p = new Point(px, py);

	if(p.isOnLine(p1,p2) && p.isOnLine(p3,p4)) {

		return p;

	}else {

		return null;

	}

}
