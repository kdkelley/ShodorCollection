function Scene(url) {
  var imgURL = url;
  var clickBoxes = [];

  this.addClickBox = function(cb) {
    clickBoxes.push(cb);
  }

  this.getClickBoxes = function() {
    return clickBoxes;
  }

  this.setImgURL = function(url) {
    imgURL = url;
  }

  this.load = function() {
    activeScene = this;
    var img = new Image;
    img.onload = function() {
      ctx.drawImage(img,0,0);
      for(var i=0;i<clickBoxes.length;i++) {
        if(DEBUG.DRAW_CLICKBOXES) {
          clickBoxes[i].draw();
        }
        if(clickBoxes[i].onload) {
          clickBoxes[i].onload();
        }
      }
    }
    img.src = imgURL;
  }

}
