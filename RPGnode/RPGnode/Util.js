var Util = {};

Util.getRandomIntInRange = function(min, max, n) {

	if(!n) {

		n = 1;

	}

	var total = 0;

	for(var i=0;i<n;i++) {

		total += Math.floor(Math.random() * (max - min + 1)) + min;

	}

	return total;

}

Util.isFunction = function(obj) {

	return !!(obj && obj.constructor && obj.call && obj.apply);

}
