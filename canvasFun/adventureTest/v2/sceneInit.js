function sceneInit() {
  SCENES.library = new Scene("AudioBooks.jpg");
  var cb1 = new ClickBox({x:111, y:47}, {x:150, y:199});
  cb1.onclick = function() {
    alert("You discover a secret area!");
    SCENES.secret.load();
  }
  SCENES.library.addClickBox(cb1);

  var cb2 = new ClickBox({x:394, y:34}, {x:429, y:198});
  cb2.onload = function() {
    if(!this.counter) {
      this.counter = 0;
    }
  }
  cb2.onclick = function() {
    cb2.counter += 1;
    alert("There is nothing special about this book");
    if(cb2.counter >= 3) {
      alert("Actually, it seems like there is!");
      SCENES.secret.load();
    }
  }
  SCENES.library.addClickBox(cb2);

  SCENES.secret = new Scene("thumbs.jpg");
  var cb3 = new ClickBox({x:0, y:430}, {x:500, y:500});
  cb3.onclick = function() {
    alert("You walk back into the library.");
    SCENES.library.load();
  }
  SCENES.secret.addClickBox(cb3);

}
