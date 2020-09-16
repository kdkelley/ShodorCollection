var numRays = 360 * 1;
var twoPI = Math.PI * 2;
var iter = twoPI / numRays;
var sinValues = [];
var cosValues = [];

for(var i=0;i<twoPI;i+=iter) {

	sinValues.push(Math.sin(i));
	cosValues.push(Math.cos(i));

}

function LightObject(x,y,radius,color,lightRadius,lightColor) {

	this.x = x;
	this.y = y;
	this.pos = new Point(x, y);
	this.radius = radius;
	this.color = color;
	this.lightRadius = lightRadius;
	this.lightColor = lightColor;

	this.drawObject = function(ctx) {

		ctx.beginPath();
		ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.closePath();

	}

	this.drawLight = function(ctx, list) {
		
		ctx.beginPath();
		ctx.strokeStyle=this.lightColor;
		for(var i=0;i<numRays;i+=1) {

			//this.drawRay(ctx,darkObjectList,i);
			this.betaRay(ctx,darkObjectList,i);

		}

		ctx.stroke();
		ctx.closePath();

	}

	this.betaRay = function(ctx, list, theta) {

		//console.log(rayNum);

		var startPoint = this.pos;
		//var endx = this.pos.x + Math.sin(theta) * this.lightRadius;
		//var endy = this.pos.y + Math.cos(theta) * this.lightRadius;
		var endx = this.pos.x + sinValues[theta] * this.lightRadius;
		var endy = this.pos.y + cosValues[theta] * this.lightRadius;

		var closestPoint = new Point(endx, endy);
		var closestPointDist = Math.pow(this.lightRadius,2);

		for(var i=0;i<list.length;i++) {

			if(list[i].getClosestDistance(this.pos) < this.lightRadius) {

				  intersects = list[i].getIntersects(startPoint,closestPoint);
				  for(var j=0;j<intersects.length;j++) {

					  var intersectDist = squareBetween(this.pos, intersects[j]);

					  if(intersectDist < closestPointDist) {

						  closestPointDist = intersectDist;
						  closestPoint = intersects[j];

					  }

				  }

			}

		}

		ctx.moveTo(startPoint.x, startPoint.y);
		ctx.lineTo(closestPoint.x , closestPoint.y);
		ctx.strokeStyle = this.lightColor;

	}

	this.drawRay = function(ctx,list,theta) {

		var rayDist = 0;
		var testPoint = new Point(this.x,this.y);

		while(!testPoint.insideRect(list) && rayDist < this.lightRadius) {

			rayDist += 1;
			testPoint.x -= Math.sin(theta);
			testPoint.y -= Math.cos(theta);
			
			if(rayDist > this.radius) {

				testPoint.draw(ctx,"red");

			}

		}

	}

	this.draw = function(ctx,list) {

		this.drawLight(ctx,list);
		this.drawObject(ctx);
	}

}
