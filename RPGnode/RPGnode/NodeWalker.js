NodeWalker = {};

NodeWalker.automateTables = false;
NodeWalker.randomDecisions = false;
NodeWalker.automateChecks = false;

NodeWalker.walkNode = function(n) {

  if(!(n instanceof Node)) {

    return false;

  }

  if(n.isVisible()) {

    Display.node(n);

  }

  if(n.getType() == Node.type.TEXT_ONLY) {

    if(n.getChildren().length > 0) {

      //console.log(n.getChildren()[0])
      NodeWalker.walkNode(n.getChildren()[0]);

    }else {

      return true;

    }

  }else if(n.getType() == Node.type.TABLE) {

    if(n.getValue().isAutoRolled()) {

      NodeWalker.rollTableNode(n);

    }

  }else if(n.getType() == Node.type.CONDITION) {

    Display.conditionalResult(n.getID());

  }else if(n.getType() == Node.type.REWARD){

    var reward = n.getValue();

    reward.getValue();

    if(n.getChildren().length > 0) {

      NodeWalker.walkNode(n.getChildren()[0]);

    }

  }

}

NodeWalker.rollTableNode = function(rtn) {

  if(!(rtn instanceof Node)) {

    return false;

  }

  if(rtn.getType() != Node.type.TABLE) {

    return false;

  }

  Display.tableResult(rtn.getID());
//  NodeWalker.walkNode(rtn.getValue().roll().result);

}
