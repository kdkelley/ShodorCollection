function Node(t, v, txt) {

	var id = Node.nextID;
	Node.nextID += 1;
	Node.NodeList.push(this);
	var parent;
	var children = [];
	var type = t;
	var value = v;
	var text = txt;
	var isVisible = true;

	if(t == Node.type.TEXT_ONLY || t == Node.type.CONTINUE) {

		text = v;

	}

	this.setVisible = function(b) {

		isVisible = b;

	}

	this.isVisible = function() {

		return isVisible;

	}

	this.getID = function() {

		return id;

	}

	this.getText = function() {

		return text;

	}

	this.setText = function(t) {

		text = t;

	}

	this.getValue = function() {

		return value;

	}

	this.getType = function() {

		return type;

	}

	this.getParent = function() {

		return parent;

	}

	this.getChildren = function() {

		return children;

	}

	this.addChild = function(cn, setParent) {

		if(arguments.length == 1) {

			setParent = true;

		}

		children.push(cn);

		if(setParent) {

			cn.setParent(this, false);

		}

	}

	this.setParent = function(pn, setChild) {

		if(arguments.length == 1) {

			setChild = true;

		}

		parent = pn;

		if(setChild) {

			pn.addChild(this, false);

		}

	}

}

Node.nextID = 0;

Node.NodeList = [];

Node.NodeList.getNodeById = function(searchID) {

	for(var i=0;i<Node.NodeList.length;i++) {

		if(Node.NodeList[i].getID() == searchID) {

			return Node.NodeList[i];

		}

	}

	return false;

}

Node.type = {};

//display text, move to child 0
Node.type.TEXT_ONLY = "text only";

//display table, roll on table
Node.type.TABLE = "table";

//choose which child node to move to
Node.type.DECISION = "decision";

//give the character some sort of reward, move to child 0
Node.type.REWARD = "reward";

//terminate, same as any node without children
Node.type.END = "end";

//child 0 is the node that'll be moved to in case of success
//child 1 is the node that'll be moved to in case of failure
Node.type.CONDITION = "condition";
Node.type.SKILLCHECK = "skillcheck";

Node.type.INPUT = "input";
Node.type.CONTINUE = "continue";
