function ClickBox(point1, point2) {
  var p1 = point1;
  var p2 = point2;

  this.contains = function(p) {
    if(p.x < p1.x || p.y < p1.y) {
      return false;
    }
    if(p.x > p2.x || p.y > p2.y) {
      return false;
    }
    return true;
  }

  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth="10";
    ctx.strokeStyle="red";
    ctx.rect(p1.x, p1.y, p2.x-p1.x, p2.y-p1.y);
    ctx.stroke();
  }

}
