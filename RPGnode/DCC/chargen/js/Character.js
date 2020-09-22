function Character() {

	var name;
	var abilities = [10,10,10,10,10,10];
	var occupation;
	var weaponTraining;
	var equipment;
	var tradeGoods;
	var hitPoints;
	var money;
	var luckRoll;
	var alignment;

	this.getHTMLString = function() {

		var html = "";

		html += "<b>" + name + "</b></br>";

		for(var i=0;i<abilities.length;i++) {

			html += Character.abilities.NAMES[i] + ":" + abilities[i] + " (" + this.getAbilityModByIndex(i) + ")</br>";

		}

		html += "</br>Lucky Roll:" + luckRoll + "</br>";

		html += "</br>Hit Points:" + hitPoints + "</br>";

		html += "Money: " + money + " cp</br>";

		html += "XP:-100</br>";

		html += "Equipment Piece:" + equipment + "</br>";

		html += "Occupation:" + occupation + "</br>";

		html += "&nbsp&nbsp&nbspTrained Weapon:" + weaponTraining + "</br>";

		html += "&nbsp&nbsp&nbspTrade Goods:" + tradeGoods + "</br>";

		html += "</br> Alignment:" + alignment;

		return html;

	}

	this.getAlignment = function() {

		return alignment;

	}

	this.setAlignment = function(a) {

		alignment = a;

	}

	this.getLuckRoll = function() {

		return luckRoll;

	}

	this.setLuckRoll = function(lr) {

		luckRoll = lr;

	}

	this.getMoney = function() {

		return m;

	}

	this.setMoney = function(m) {

		money = m;

	}

	this.getHitPoints = function() {

		return hitPoints;

	}

	this.setHitPoints = function(hp) {

		if(hp < 1) {

			hp = 1;

		}

		hitPoints = hp;

	}

	this.getTradeGoods = function() {

		return tradeGoods;

	}

	this.setTradeGoods = function(tg) {

		tradeGoods = tg;

	}

	this.getEquipment = function() {

		return equipment;

	}

	this.setEquipment = function(eq) {

		equipment = eq;

	}

	this.getWeaponTraining = function() {

		return weaponTraining;

	}

	this.setWeaponTraining = function(wt) {

		weaponTraining = wt;

	}

	this.getOccupation = function() {

		return occupation;

	}

	this.setOccupation = function(o) {

		occupation = o;

	}

	this.setName = function(n) {

		name = n;

	}

	this.getName = function() {

		return name;

	}

	this.setAbilityByIndex = function(index, value) {

		abilities[index] = value;

	}

	this.getAbilityByIndex = function(index) {

		return abilities[index];

	}

	this.getAbilityModByIndex = function(index) {

		var ab = this.getAbilityByIndex(index);

		var mod;

		if(ab <= 3) {

			mod = -3;

		}else if(ab <= 5) {

			mod = -2;

		}else if(ab <= 8) {

			mod = -1;

		}else if(ab <= 12) {

			mod = 0;

		}else if(ab <= 15) {

			mod = 1;

		}else if(ab <= 17) {

			mod = 2;

		}else {

			mod = 3;

		}

		return mod;

	}

}

Character.abilities = {};
Character.abilities.NAMES = ["strength", "agility", "stamina", "personality", "intelligence", "luck"];
Character.abilities.STR_INDEX = 0;
Character.abilities.AGL_INDEX = 1;
Character.abilities.STA_INDEX = 2;
Character.abilities.PER_INDEX = 3;
Character.abilities.INT_INDEX = 4;
Character.abilities.LUK_INDEX = 5;
