function Vector(x,y) {

	this.x = x;
	this.y = y;

	this.getX = function() {

		return this.x;

	}

	this.setX = function(x) {

		this.x = x;

	}

	this.getY = function() {

		return this.y;

	}

	this.setY = function(y) {

		this.y = y;

	}

	this.getMag = function() {

		return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));

	}

	this.getTheta = function() {

		return thetaBetween(0,0,this.x,this.y);

	}	

	this.setMag = function(mag) {

		var newy = Math.cos(this.getTheta()) * mag;
		var newx = Math.sin(this.getTheta()) * mag;

		this.y = newy;
		this.x = newx;

	}

	this.setTheta = function(theta) {

		var newy = Math.cos(theta) * this.getMag();
		var newx = Math.sin(theta) * this.getMag();

		this.y = newy;
		this.x = newx;

	}

	this.addVector = function(v) {

		this.y += v.y;
		this.x += v.x;

	}

	this.draw = function(x,y,m,ctx) {

		ctx.beginPath();
		ctx.strokeStyle="black";
		//ctx.arc(x,y,5,0,2*Math.PI);
		ctx.moveTo(x,y);
		ctx.lineTo((this.x * m) + x,(this.y * m) + y);
		ctx.stroke();
		ctx.closePath();

	}

	this.clearDraw = function(x,y,m,ctx) {

		ctx.beginPath();
		ctx.fillStyle="white";
		ctx.arc(x,y,this.getMag() * (m),0,2*Math.PI);
		ctx.fill();
		ctx.closePath();

	}

}
