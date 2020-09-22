var autoTables = true;

var char = new Character();

var treeBuilder = {};

var finishCall = new Bonus("finish", finish, window);
var node_finish_call = new Node(Node.type.REWARD, finishCall , "Character Data:");

var node_finish_button = new Node(Node.type.CONTINUE, "Finish!");
node_finish_button.addChild(node_finish_call);

var input_name = new Input(char.setName, char);
input_name.setPlaceholderText("Character Name");
input_name.setPromptText("Name:");
input_name.setInputType("text");
var node_finish = new Node(Node.type.INPUT, input_name, "input test");
node_finish.addChild(node_finish_button)

treeBuilder.makeLuckscoreTable = function() {

  var node_table_equipment = treeBuilder.makeEquipmentTable();

  var rolltable_luckscore = new RollTable();
  var node_table_luckscore = new Node(Node.type.TABLE, rolltable_luckscore, "luck score");
  rolltable_luckscore.setDefaultChildNode(node_table_equipment);
  rolltable_luckscore.setAutoRoll(autoTables);

  for(var i=0;i<Data.luckscore.length;i++) {

    var bonus = new Bonus("luckscore bonus", char.setLuckRoll, char, Data.luckscore[i])
    var node = new Node(Node.type.REWARD, bonus ,Data.luckscore[i]);
    //node.addChild(node_table_equipment, false);

    rolltable_luckscore.addElement(new RollTableElement(node, 1));

  }

  rolltable_luckscore.autoSetDiceFaces();

  return node_table_luckscore;

}

treeBuilder.makeEquipmentTable = function() {

  var node_table_occupation = treeBuilder.makeOccupationTable();

  var rolltable_equipment = new RollTable();
  var node_table_equipment = new Node(Node.type.TABLE, rolltable_equipment , "equipment");
  rolltable_equipment.setAutoRoll(autoTables);
  rolltable_equipment.setDefaultChildNode(node_table_occupation);

  for (var i=0;i<Data.equipment.length;i++) {

    var bonus = new Bonus("equipment set", char.setEquipment, char, Data.equipment[i])
    var node = new Node(Node.type.REWARD, bonus ,Data.equipment[i]);

    rolltable_equipment.addElement(new RollTableElement(node, 1));

  }

  rolltable_equipment.autoSetDiceFaces();

  return node_table_equipment;

}

treeBuilder.makeOccupationTable = function() {

  var node_table_alignment = treeBuilder.makeAlignmentTable();

  var rolltable_occupation = new RollTable();
  var node_table_occupation = new Node(Node.type.TABLE, rolltable_occupation , "occupation");
  rolltable_occupation.setAutoRoll(autoTables);

  for(var i=0;i<Data.occupation.length;i++) {

    var setOccupation = new Bonus("set occupation", char.setOccupation, char, Data.occupation[i].name);
    var node_setOccupation = new Node(Node.type.REWARD, setOccupation ,Data.occupation[i].name);

    var setTrainedWeapon = new Bonus("set trained weapon", char.setWeaponTraining, char, Data.occupation[i].trainedWeapon);
    var node_setTrainedWeapon = new Node(Node.type.REWARD, setTrainedWeapon ,Data.occupation[i].trainedWeapon);

    var setTradeGoods = new Bonus("set trade goods", char.setTradeGoods, char, Data.occupation[i].item);
    var node_setTradeGoods = new Node(Node.type.REWARD, setTradeGoods ,Data.occupation[i].item);

    node_setOccupation.addChild(node_setTrainedWeapon);
    node_setTrainedWeapon.addChild(node_setTradeGoods);
    node_setTradeGoods.addChild(node_table_alignment, false);

    rolltable_occupation.addElement(new RollTableElement(node_setOccupation, Data.occupation[i].weight));

  }

  rolltable_occupation.autoSetDiceFaces();

  return node_table_occupation;

}

treeBuilder.makeAlignmentTable = function() {

  var rolltable_alignment = new RollTable();
  var node_table_alignment = new Node(Node.type.TABLE, rolltable_alignment , "alignment");
  rolltable_alignment.setAutoRoll(autoTables);
  rolltable_alignment.setDefaultChildNode(node_finish);

  for(var i=0;i<Data.alignment.length;i++) {

    var setAlignment = new Bonus("set occupation", char.setAlignment, char, Data.alignment[i]);
    var node_setAlignment = new Node(Node.type.REWARD, setAlignment ,Data.alignment[i]);

    rolltable_alignment.addElement(new RollTableElement(node_setAlignment, 1));

  }

  rolltable_alignment.autoSetDiceFaces();

  return node_table_alignment;

}

function main() {

  char.setAbilityByIndex(Character.abilities.STR_INDEX, Util.getRandomIntInRange(1,6,3));
  char.setAbilityByIndex(Character.abilities.AGL_INDEX, Util.getRandomIntInRange(1,6,3));
  char.setAbilityByIndex(Character.abilities.STA_INDEX, Util.getRandomIntInRange(1,6,3));
  char.setAbilityByIndex(Character.abilities.PER_INDEX, Util.getRandomIntInRange(1,6,3));
  char.setAbilityByIndex(Character.abilities.INT_INDEX, Util.getRandomIntInRange(1,6,3));
  char.setAbilityByIndex(Character.abilities.LUK_INDEX, Util.getRandomIntInRange(1,6,3));
  char.setHitPoints(Util.getRandomIntInRange(1,4) + char.getAbilityModByIndex(Character.abilities.STA_INDEX));
  char.setMoney(Util.getRandomIntInRange(1,12,5));

//  NodeWalker.walkNode(node_table_luckscore);
  NodeWalker.walkNode(treeBuilder.makeLuckscoreTable());

}

function finish() {

  Display.html(char.getHTMLString());
  document.write(char.getHTMLString());
  console.log("done");

}
