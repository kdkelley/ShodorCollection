function GravityObject(x,y,mass,velocity) {

	this.id = objectList.length;
	this.x = x;
	this.y = y;
	this.mass = mass;
	this.velocity = velocity;
	this.fixed = false;

	this.setFixed = function(b) {

		this.fixed = b;

	}

	this.getRadius = function() {

		return (Math.log(this.mass) / Math.log(2.0)) + 1;

	}
	this.radius = this.getRadius();

	this.getLightRadius = function() {

		if(this.mass >= 1000) {

			return 750;

		}else {

			return 0;

		}

	}
	this.lightRadius = this.getLightRadius();

	this.getColor = function() {

		var red = Math.floor(this.mass / 10);
		var green = 0;
		var blue = 0;

		if(red < 17) {

			red = 17;

		}

		if(red > 255) {

			green = red-255;
			red = 255;

		}

		if(green < 17) {

			green = 17;

		}

		if(green > 255) {

			blue = green-255;
			green = 255;

		}

		if(blue < 17) {

			blue = 17;

		}

		if(blue > 255) {

			blue = 255;

		}

		return "#" + red.toString(16) + green.toString(16) + blue.toString(16);

	}
	this.color = this.getColor();

	this.getLightColor = function() {

		var red = Math.floor(this.mass / 10);
		var green = 0;
		var blue = 0;

		if(red < 17) {

			red = 17;

		}

		if(red > 255) {

			green = red-255;
			red = 255;

		}

		if(green < 17) {

			green = 17;

		}

		if(green > 255) {

			blue = green-255;
			green = 255;

		}

		if(blue < 17) {

			blue = 17;

		}

		if(blue > 255) {

			blue = 0;
			red = 0;
			green = 0;

		}

		return "#" + red.toString(16) + green.toString(16) + blue.toString(16);

	}
	this.lightColor = this.getLightColor();

	this.draw = function(ctx) {

		this.drawLight(ctx);

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.strokeStyle="black";
		ctx.stroke();
		ctx.closePath();

	}

	this.drawLight = function(ctx) {

		var numRays = 90;

		for(var i=0;i<Math.PI*2;i+=(Math.PI/(numRays/2))) {

			this.drawRay(ctx,i);

		}

	}

	this.drawRay = function(ctx, theta) {

		var startPoint = new Point(this.x, this.y);
		var endx = this.x + Math.sin(theta) * this.lightRadius;
		var endy = this.y + Math.cos(theta) * this.lightRadius;
		var endPoint = new Point(endx, endy);

		var closestPoint = endPoint;
		var closestPointDist = distanceBetween(new Point(this.x, this.y), endPoint);

		endPoint = closestPoint;

		ctx.beginPath();
		ctx.moveTo(startPoint.x, startPoint.y);
		ctx.lineTo(endPoint.x , endPoint.y);
		ctx.strokeStyle=this.lightColor;
		ctx.stroke();
		ctx.closePath();

	}

	this.updatePosition = function(ctx) {

		if(!this.fixed) {

			this.x += this.velocity.getX();
			this.y += this.velocity.getY();

		}else {

			this.velocity = new Vector(0,0);

		}

		this.draw(ctx);

	}

	this.calculateGravity = function(list) {


		var netForce = new Vector(0,0);

		for(var i=0;i<list.length;i++) {

			if(this.id != list[i].id) {

				  if(distanceBetween(this.x,this.y,list[i].x,list[i].y) > 3 + this.getRadius() + list[i].getRadius()) {

					  var gravityForce = new Vector(1,0);
					  //console.log(radToDeg(thetaBetween(this.x,this.y,list[i].x,list[i].y)));
					  gravityForce.setTheta(thetaBetween(this.x,this.y,list[i].x,list[i].y));
					  //console.log(radToDeg(gravityForce.getTheta()));
					  gravityForce.setMag((this.mass * list[i].mass) / Math.pow(distanceBetween(this.x, this.y, list[i].x, list[i].y), 2));
					  netForce.addVector(gravityForce);


				  }else {

					if(list[i].mass > this.mass) {

						this.fixed = list[i].fixed;

					}

					var v1 = this.velocity
					v1.setMag(this.velocity.getMag() * this.mass);
					var v2 = list[i].velocity;
					v2.setMag(list[i].velocity.getMag() * list[i].mass);
					v1.addVector(v2);

					this.x = ((this.x * this.mass) + (list[i].mass * list[i].x)) / (this.mass + list[i].mass);
					this.y = ((this.y * this.mass) + (list[i].mass * list[i].y)) / (this.mass + list[i].mass);

					this.mass += list[i].mass;
					this.lightRadius = this.getLightRadius();
					this.lightColor = this.getLightColor();
					this.color = this.getColor();
					v1.setMag(v1.getMag() / this.mass);
					this.velocity = v1;
					this.radius = this.getRadius();
					list.splice(i,1);

				  }

			}

		}


		netForce.setMag(netForce.getMag() / (this.mass));

		this.velocity.addVector(netForce);

	}

}
