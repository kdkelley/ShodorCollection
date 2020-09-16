var gp;

function init() {

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	gp = new GraphPaper3D(context);

}

function GraphPaper3D(canvasContext) {

	var ctx = canvasContext;
	//var xyAngle = 0;
	//var xzAngle = 0;
	//var cameraDistance = 10;
	var cameraPoint = new Point(10, 0, 0);

	var renderObjects = [];

	this.addObject = function(obj) {

		renderObjects.push(obj);

	}

	this.render = function() {

		for(var i=0;i<renderObjects.length;i++) {

			var rp = renderObjects[i];
			var rploc = rp.getCoordsObj();

			var xslope = 

		}

	}

}

function Point(nx,ny,nz) {

	var x = nx;
	var y = ny;
	var z = nz;

	this.getX = function() {

		return x;

	}

	this.setX = function(n) {

		x = n;

	}

	this.getY = function() {

		return y;

	}

	this.setY = function(n) {

		y = n;

	}

	this.getZ = function() {

		return z;

	}

	this.setZ = function(n) {

		z = n;

	}

	this.getCoords = function() {

		return [x, y, z];

	}

	this.getCoordsObj = function() {

		var co = {};
		co.x = x;
		co.y = y;
		co.z = z;
		return co;

	}

	this.setCoords = function(nx, ny, nz) {

		x = nx;
		y = ny;
		z = nz;

	}

	this.setCoordsFromObj = function(obj) {

		x = obj.x;
		y = obj.y;
		z = obj.z;

	}

}

