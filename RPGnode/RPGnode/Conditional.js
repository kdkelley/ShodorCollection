function Conditional() {

  var values = [new Bonus(), new Bonus()];
  var comparisonOperator;
  var returnValues = {};

  this.getReturnValues = function() {

    return returnValues;

  }

  this.getExpressionString = function() {

    var retString = "";

    retString += values[0].getName() + " " + comparisonOperator + " " + values[1].getName()

    return retString;

  }

  this.setReturnValue = function(b, val) {

    returnValues[b] = val;

  }

  this.setValue = function(i, bon) {

    values[i] = bon;

  }

  this.setComparisonOperator = function(co) {

    comparisonOperator = co;

  }

  this.check = function(forceResult) {

    var v1 = values[0].getValue();
    var v2 = values[1].getValue();

    var retObj = {};
    retObj.v1 = v1;
    retObj.v2 = v2;
    retObj.operator = comparisonOperator;
    retObj.forced = false;

    if(comparisonOperator == Conditional.operators.EQUALS) {

      retObj.result = (v1 == v2);

    }else if(comparisonOperator == Conditional.operators.LESS_THAN) {

      retObj.result = (v1 < v2);

    }else if(comparisonOperator == Conditional.operators.LESS_THAN_EQUALS) {

      retObj.result = (v1 <= v2);

    }else if(comparisonOperator == Conditional.operators.GREATER_THAN) {

      retObj.result = (v1 > v2);

    }else if(comparisonOperator == Conditional.operators.GREATER_THAN_EQUALS) {

      retObj.result = (v1 >= v2);

    }else if(comparisonOperator == Conditional.operators.NOT_EQUALS) {

      retObj.result = (v1 != v2);

    }

    if(typeof forceResult == "boolean") {

      retObj.result = forceResult;
      retObj.forced = true;

    }

    retObj.boolResult = retObj.result;

    if(returnValues[retObj.result]) {

      retObj.result = returnValues[retObj.result];

    }

    return retObj;

  }

}

Conditional.operators = {};
Conditional.operators.EQUALS = "==";
Conditional.operators.LESS_THAN = "<"
Conditional.operators.LESS_THAN_EQUALS = "<="
Conditional.operators.GREATER_THAN = ">"
Conditional.operators.GREATER_THAN_EQUALS = ">="
Conditional.operators.NOT_EQUALS = "!="
