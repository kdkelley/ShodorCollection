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

		if(this.mass > 1000) {

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

	this.draw = function(ctx) {

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.strokeStyle="black";
		ctx.stroke();
		ctx.closePath();

	}

	this.clearDraw = function(ctx) {

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle="white";
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

					  var distanceScale = 1.25;
					  var actualDistance = distanceBetween(this.x, this.y, list[i].x, list[i].y);
					  var effectiveDistance = actualDistance * distanceScale;

					  gravityForce.setMag((this.mass * list[i].mass) / Math.pow(effectiveDistance, 2));
					  //gravityForce.setMag((this.mass * list[i].mass) / Math.pow(distanceBetween(this.x, this.y, list[i].x, list[i].y), 2));
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
