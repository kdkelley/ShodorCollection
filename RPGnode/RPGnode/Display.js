var Display = {};

Display.node = function(n) {

	if(n.getType() == Node.type.TEXT_ONLY || n.getType() == Node.type.REWARD || n.getType() == Node.type.END) {

		Display.html(n.getText(), true);

	}else if(n.getType() == Node.type.TABLE || n.getType() == Node.type.DECISION) {

		Display.rollTable(n);

	}else if(n.getType() == Node.type.SKILLCHECK || n.getType() == Node.type.CONDITION) {

		Display.conditional(n);

	}else if(n.getType() == Node.type.CONTINUE) {

		Display.continue(n);

	}else if(n.getType() == Node.type.INPUT) {

		Display.input(n);

	}else {

		Display.html("unrecognized node type");

	}

}

Display.input = function(n) {

	var inobj = n.getValue()

	var html = inobj.getPromptText() + "<input id='lastInput' class='disableOnDisplay' placeholder='" + inobj.getPlaceholderText() + "' type='" + inobj.getInputType() + "' ></input>";

	html += "<input type='button' value='" + inobj.getButtonText() + "' onclick='Display.inputResult(" + n.getID() + ")'></input>";

	Display.html(html, true);

}

Display.inputResult = function(nodeID) {

	var li = document.getElementById('lastInput');
	li.id = 'oldInput';
	Node.NodeList.getNodeById(nodeID).getValue().setResult(li.value);

	NodeWalker.walkNode(Node.NodeList.getNodeById(nodeID).getChildren()[0]);

}

Display.continue = function(n) {

	var html = "<input type='button' value='" + n.getText() + "' onclick='NodeWalker.walkNode(Node.NodeList.getNodeById(" + n.getChildren()[0].getID() + "))'></input>";

	Display.html(html, true)

}

Display.conditional = function(c) {

	var n = false;

	if(c instanceof Node) {

		n = c;
		c = n.getValue();

	}

	var html = "<table class='lastTable' border=1>";

	html += "<tr>";

	if(n.getType() == Node.type.SKILLCHECK) {

		html += "<th colspan='3'>";

	}else if(n.getType() == Node.type.CONDITION) {

		html += "<th colspan='2'>";

	}

	html += n.getText();

	html += "</th>";

	html += "</tr>";

	html += "<tr><th colspan='2'>";

	html += c.getExpressionString();

	html += "</th>";

	if(n) {

		if(n.getType() == Node.type.SKILLCHECK) {

				html += "<td>";

				html += "<input type='button'class='disableOnDisplay'  value='check' onclick='Display.conditionalResult(" + n.getID() + ")'>"

				html += "</td>";

		}

	}

	html += "<tr><td>";

	if(n) {

		if(n.getType() == Node.type.SKILLCHECK) {

			html += "on pass";

		}else if(n.getType() == Node.type.CONDITION) {

			html += "if true";

		}

	}else {

		html += "if true";

	}

	html += "</td><td>";

	var retValue0 = c.getReturnValues()[true];

	if(retValue0 instanceof Node) {

		html += retValue0.getText();

	}else {

		html += retValue0

	}

	html += "</td>"

	if(n.getType() == Node.type.SKILLCHECK) {

		html += "<td><input type='button' class='disableOnDisplay'  value='force' onclick='Display.conditionalResult(" + n.getID() + ",true)'></td>";

	}

	html += "</tr>";

	html += "<tr><td>";

	if(n) {

		if(n.getType() == Node.type.SKILLCHECK) {

			html += "on fail";

		}else if(n.getType() == Node.type.CONDITION) {

			html += "if false";

		}

	}else {

		html += "if false";

	}

	html += "</td><td>";

	var retValue0 = c.getReturnValues()[false];

	if(retValue0 instanceof Node) {

		html += retValue0.getText();

	}else {

		html += retValue0;

	}

	html += "</td>";

	if(n.getType() == Node.type.SKILLCHECK) {

		html += "<td><input type='button' class='disableOnDisplay' value='force' onclick='Display.conditionalResult(" + n.getID() + ",false)'></td>";

	}

	html += "</tr>";

	html += "</table>";

	Display.html(html);

}

Display.conditionalResult = function(nodeID, forceResult) {

	var cn = Node.NodeList.getNodeById(nodeID);

	var conditional = cn.getValue();

	var cr = conditional.check(forceResult);

	console.log(cr)

	var tableElement = document.getElementsByClassName('lastTable')[0];
	tableElement.setAttribute('class','oldTable');

	var newRow = document.createElement("tr");
	var newRowElement = document.createElement("th");

	if(cn.getType() == Node.type.SKILLCHECK) {

		newRowElement.setAttribute('colspan','3');

	}else if(cn.getType() == Node.type.CONDITION) {

		newRowElement.setAttribute('colspan','2');

	}
	newRow.appendChild(newRowElement);

	var span = document.createElement("span");

	if(cr.boolResult) {

		span.setAttribute('style','color:green;');

	}else {

		span.setAttribute('style','color:red;');

	}

	var tableResultText = document.createTextNode(cr.v1 + cr.operator + cr.v2);
	span.appendChild(tableResultText);
	newRowElement.appendChild(span);

	tableElement.appendChild(newRow);

	if(cr.result instanceof Node) {

		NodeWalker.walkNode(cr.result);

	}

}

Display.tableResult = function(nodeID, forceResult) {

	var tn = Node.NodeList.getNodeById(nodeID);

	var table = tn.getValue();

	var ro = table.roll(0, forceResult);

	var tableElement = document.getElementsByClassName('lastTable')[0];
	tableElement.setAttribute('class','oldTable');

	var newRow = document.createElement("tr");
	var newRowElement = document.createElement("th");
	newRowElement.setAttribute('colspan','3');
	newRow.appendChild(newRowElement);

	var tableResultText = document.createTextNode(ro.unmodifiedRoll + "[roll] " + table.getBonusString() + " = " + ro.postAllModifiersRoll);
	newRowElement.appendChild(tableResultText);

	if(tn.getType() == Node.type.TABLE) {

		tableElement.appendChild(newRow);

	}

	if(ro.result instanceof Node) {

		NodeWalker.walkNode(ro.result);

	}

}

Display.rollTable = function(t) {

	var n = false;

	if(t instanceof Node) {

		n = t;
		t = n.getValue();

	}

	var html = "<table border=1><tbody class='lastTable'>";

	if(n.getType() == Node.type.TABLE) {

		html += "<tr><th colspan='3'>";

		html += n.getText();

		html += "</th></tr>";

	}

	html += "<tr><th colspan='2'>";

	if(n.getType() == Node.type.TABLE) {

		html += t.getRollString();

	}else if(n.getType() == Node.type.DECISION) {

		html += n.getText()

	}

	html += "</th>";

	if(n) {

		if(n.getType() == Node.type.TABLE) {

			html += "<td>";

	//		html += "<input type='button' class='disableOnDisplay' onclick='NodeWalker.rollTableNode(Node.NodeList.getNodeById(" + n.getID() + "))' value='roll table'></input>";
			html += "<input type='button' class='disableOnDisplay' onclick='Display.tableResult(" + n.getID() + ")' value='roll table'></input>";

			html += "</td>";

		}

	}

	html += "</tr>";

	var elements = t.getElements();

	var weightSoFar = t.getMinValue() - 1;

	for(var i=0;i<elements.length;i++) {

		html += "<tr>";

		if(n.getType() == Node.type.TABLE) {

			html += "<td>";

			if(elements[i].weight == 1) {

				html += weightSoFar + elements[i].weight;

			}else if(elements[i].weight > 1){

				html += (weightSoFar + 1) + "-" + (weightSoFar + elements[i].weight);

			}else {

				html += "---";

			}

			html += "</td>";

		}

		var elemValue = elements[i].value;

		if(elemValue instanceof Node) {

			elemValue = elemValue.getText();

		}

		html += "<td>" + elemValue + "</td>";

		var selectText;

		if(n.getType() == Node.type.TABLE) {

			selectText = "force";

		}else if(n.getType() == Node.type.DECISION) {

			selectText = "select";

		}

		if(n) {

			html += "<td>";

			html += "<input type='button' class='disableOnDisplay' onclick='Display.tableResult(" + n.getID() + ", " + (weightSoFar + elements[i].weight) + ")' value='" + selectText + "'></input>";

			html += "</td>";

		}

		html += "</tr>";

		weightSoFar += elements[i].weight;

	}

	html += "</tbody></table>";

	Display.html(html);

}

Display.html = function(html,addBreak) {

	var disableElements = document.getElementsByClassName('disableOnDisplay');

	for(var i=0;i<disableElements.length;i++) {

		disableElements[i].disabled = true;

	}

	var outputElement = document.getElementById('output');

	if(addBreak) {

		html += "</br>";

	}

	html += "<span id='output'></span>";
	outputElement.innerHTML = html;
	outputElement.id = 'oldOutput';

}

Display.numTablesDisplayed = 0;
