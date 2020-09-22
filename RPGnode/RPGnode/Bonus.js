function Bonus(n, vf, vc) {

	var name = n;
	var valueFunction = vf;
	var valueContext = vc;
	var valueFunctionArgs = Array.prototype.slice.call(arguments).slice(3);

	this.getValue = function() {

		if(typeof valueFunction == "number") {

			return valueFunction;

		}

		return valueFunction.apply(valueContext,valueFunctionArgs);

	}

	this.getName = function() {

		return name;

	}

	this.setName = function(n) {

		name = n;

	}

}
