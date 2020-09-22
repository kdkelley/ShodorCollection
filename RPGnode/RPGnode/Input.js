function Input(sf, sc) {

  var buttonText = "Submit";
  var promptText = "";
  var placeholderText = "";
  var inputType = "text";
  var setFunction = sf;
  var setContext = sc;
  var defaultValue = "";

  this.setResult = function(value) {

    var b = new Bonus("invisible", setFunction, setContext, value);
    b.getValue();

  }

  this.setPlaceholderText = function(pht) {

    placeholderText = pht;

  }

  this.getPlaceholderText = function() {

    return placeholderText

  }

  this.setInputType = function(it) {

    inputType = it;

  }

  this.getInputType = function() {

    return inputType;

  }

  this.setPromptText = function(pt) {

    promptText = pt;

  }

  this.getPromptText = function() {

    return promptText;

  }

  this.setButtonText = function(bt) {

    buttonText = bt;

  }

  this.getButtonText = function() {

    return buttonText;

  }

}
