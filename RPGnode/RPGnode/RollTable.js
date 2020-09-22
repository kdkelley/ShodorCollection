//the order in which elements are added to a roll table actually matters
//roll table is meant to simulate a table that is being "rolled" on
//this means you can add bonuses and the like to a particular roll
function RollTable() {

	var tableElements = [];
	var numDice = 1;
	var numFaces = 1;
	var bonuses = [];
	var overflowMode = RollTable.overflowMode.LAST;
	var minValue = 1;
	var autoRoll = false;
	var hasDefaultChildNode = false;
	var defaultChildNode;
	var autoDiceRecalculate = false;

	this.getAutoDiceRecalculate = function() {

		return autoDiceRecalculate;

	}

	this.setAutoDiceRecalculate = function(b) {

		autoDiceRecalculate = b;

	}

	this.autoSetDiceFaces = function() {

		numFaces = Math.floor(this.getTotalWeight() / numDice);

	}

	this.unsetDefaultChildNode = function() {

		hasDefaultChildNode = false;

	}

	this.setDefaultChildNode = function(n) {

		hasDefaultChildNode = true;
		defaultChildNode = n;

	}

	this.setAutoRoll = function(b) {

		autoRoll = b;

	}

	this.isAutoRolled = function() {

		return autoRoll;

	}

	this.getMinValue = function() {

		return minValue;

	}

	this.setMinValue = function(mv) {

		minValue = mv;

	}

	this.setOverflowMode = function(ofm) {

		overflowMode = ofm;

	}

	this.getRollString = function() {

		var rollString = this.getNumDice() + "d" + this.getNumFaces();

		if(bonuses.length > 0) {

			rollString += " +" + this.getTotalBonus() + " <i>(" + this.getBonusString() + ")</i>";

		}

//		return this.getNumDice() + "d" + this.getNumFaces() + " +" + this.getTotalBonus() + " <i>(" + this.getBonusString() + ")</i>";

		return rollString

	}

	this.getBonusString = function() {

		var bs = "";

		for(var i=0;i<bonuses.length;i++) {

			var bv = bonuses[i].getValue();

			if(bv >= 0) {

				bs += "+";

			}

			bs += bv + "[" + bonuses[i].getName() + "]";

			if(i != bonuses.length - 1) {

				bs += " ";

			}

		}

		return bs;

	}

	this.getTotalBonus = function() {

		var tb = 0;

		for(var i=0;i<bonuses.length;i++) {

			tb += bonuses[i].getValue();

		}

		return tb;

	}

	this.addBonus = function(b) {

		bonuses.push(b);

	}

	this.getElements = function() {

		return tableElements;

	}

	this.getNumDice = function() {

		return numDice;

	}

	this.getNumFaces = function() {

		return numFaces;

	}

	this.setNumDice = function(n) {

		numDice = n;

	}

	this.setNumFaces = function(n) {

		numFaces = n;

	}

	this.getTotalWeight = function() {

		var totalWeight = minValue - 1;

		for(var i=0;i<tableElements.length;i++) {

			totalWeight += tableElements[i].weight;

		}

		return totalWeight;

	}

	this.roll = function(modifier, forceResult) {

		if(!forceResult) {

			forceResult = false;

		}

		if(!modifier) {

			modifier = 0;

		}

		var roll = 0;

		var returnObj = {};

		for(var i=0;i<numDice;i++) {

			roll += Util.getRandomIntInRange(1, numFaces);

		}

		returnObj.unmodifiedRoll = roll;

		roll += this.getTotalBonus();

		returnObj.postBonusRoll = roll;

		roll += modifier;

		returnObj.postAllModifiersRoll = roll;

		if(forceResult) {

			roll = forceResult;
			returnObj.unmodifiedRoll = roll - this.getTotalBonus() - modifier;
			returnObj.postBonusRoll = roll - modifier;
			returnObj.postAllModifiersRoll = roll;

		}

		if(roll > this.getTotalWeight()) {

			if(overflowMode == RollTable.overflowMode.FALSE) {

				returnObj.result = false;
				return returnObj;

			}else if(overflowMode == RollTable.overflowMode.WRAP) {

				roll = roll % this.getTotalWeight();

				if(roll == 0) {

					roll = this.getTotalWeight();

				}

			}else if(overflowMode == RollTable.overflowMode.LAST) {

				roll = this.getTotalWeight();

			}

		}

		var i = -1;
		roll -= minValue - 1;
		while (roll > 0) {

			i += 1;
			roll -= tableElements[i].weight;

		}

		returnObj.result = tableElements[i].value;

		return returnObj;

	}

	this.addElement = function(element) {

		if(element.value instanceof Node) {

			if(element.value.getChildren().length == 0) {

				element.value.addChild(defaultChildNode, false);

			}

		}

		tableElements.push(element);

		if(this.getAutoDiceRecalculate()) {

			this.autoSetDiceFaces();

		}

	}

}

RollTable.overflowMode = {};

RollTable.overflowMode.FALSE = "false overflow";
RollTable.overflowMode.WRAP = "wrap overflow";
RollTable.overflowMode.LAST = "last overflow";

function RollTableElement(value, weight) {

	this.value = value;
	this.weight = weight;

}
