function LightObject(x,y,radius,color,lightRadius,lightColor) {

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.lightRadius = lightRadius;
	this.lightColor = lightColor;

	this.draw = function(ctx) {

		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.strokeStyle=this.color;
		ctx.stroke();
		ctx.closePath();

		var grd = ctx.createRadialGradient(this.x,this.y,this.radius,this.x,this.y,this.lightRadius);
		grd.addColorStop(0,this.lightColor);
		grd.addColorStop(1,"black");
		ctx.globalCompositeOperation = "lighter";
		ctx.globalAlpha = .5;
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,canvas.width,canvas.height);
	}

}
