function DarkRect(points,color) {

	this.points = points;
	//this.points = [new Point(x1,y1), new Point(x1,y2), new Point(x2,y2), new Point(x2,y1)];
	this.color = color;

	this.isPointInside = function(p) {

		if(p.x >= this.points[0].x && p.y >= this.points[0].y && p.x <= this.points[3].x && p.y <= this.points[3].y) {

			return true;

		}else {

			return false;

		}

	}

	this.getClosestDistance = function(p) {

		var closestDistance = distanceBetween(this.points[0], p);

		for(var i=1;i<this.points.length;i++) {

			var dist = distanceBetween(this.points[i],p);

			if(dist < closestDistance) {

				closestDistance = dist;

			}

		}

		return closestDistance;

	}

	this.getIntersects = function(p1, p2) {

		var intersects = [];

		for(var i=0;i<this.points.length;i++) {

			var p;

			if(i+1 != this.points.length) {

				p = getLineIntersect(p1,p2,this.points[i],this.points[i+1]);

			}else {

				p = getLineIntersect(p1,p2,this.points[i],this.points[0]);

			}

			if(p != null) {

				//p.draw(context, "blue");
				intersects.push(p);

			}

		}

		return intersects;

	}

	this.draw = function(ctx) {

		ctx.beginPath();
		ctx.moveTo(this.points[0].x,this.points[0].y);

		for(var i=1;i<this.points.length;i++) {

			ctx.lineTo(this.points[i].x,this.points[i].y);

		}
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.closePath();
		//ctx.stroke();
		ctx.fill();

	}

}
