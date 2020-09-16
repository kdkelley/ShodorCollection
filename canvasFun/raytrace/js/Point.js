function Point(x,y) {

	this.x = x;
	this.y = y;

	this.draw = function(ctx,color) {

		ctx.beginPath();
		ctx.arc(this.x,this.y, 1, 0, 2* Math.PI);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.strokeStyle= color;
		ctx.stroke();
		ctx.closePath();

	}

	this.insideRect = function(list) {

		for(var i=0;i<list.length;i++) {

			if(list[i].isPointInside(this)) {

				return true;

			}

		}

		return false;

	}

	this.isOnLine = function(p1,p2) {

		var tb = thetaBetween(this, p1);
		var tb1 = thetaBetween(p2,p1);

		//if(distanceBetween(this,p1) + distanceBetween(this,p2) == distanceBetween(p1,p2)) {

		if((tb >= tb1 - 0.01 && tb <= tb1 + 0.01) && distanceBetween(this,p1) < distanceBetween(p1,p2)) {

			return true;
			//this.draw(context,"black");

		}

		return false;

	}

}
