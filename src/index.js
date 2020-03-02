export default function jeck(valueA, valueB, { orderTolerant, debug } = {}) {
	const arePrimitive = isPrimitiveType(valueA) && isPrimitiveType(valueB);
	const areArray = isArray(valueA) && isArray(valueB);
	const areObject = isObject(valueA) && isObject(valueB);

	// Handle primitive types & null & undefined
	if (arePrimitive || valueA === null || valueA === undefined) {
		if (valueA === valueB) {
			return true;
		} else {
			return false;
		}
	}

	// Handle Array
	if (areArray) {
		if (compareArrays(valueA, valueB, { orderTolerant, debug })) {
			return true;
		} else {
			return false;
		}
	}

	// Handle Object
	if (areObject) {
		if (compareObjects(valueA, valueB, { orderTolerant, debug })) {
			return true;
		} else {
			return false;
		}
	}
	return null;
}

function isArray(a) {
	return a !== undefined && a !== null && a.constructor == Array;
}

function isBoolean(a) {
	return a !== undefined && a !== null && a.constructor == Boolean;
}

// function isFunction(a) {
//   return a !== undefined && a !== null && a.constructor == Function;
// }

function isNumber(a) {
	return a !== undefined && a !== null && a.constructor == Number;
}

function isString(a) {
	return a !== undefined && a !== null && a.constructor == String;
}

function isObject(obj) {
	return obj !== undefined && obj !== null && obj.constructor == Object;
}

function isPrimitiveType(a) {
	return isBoolean(a) || isString(a) || isNumber(a);
}

function compareArrays(a, b, { orderTolerant, debug } = {}) {
	const areArray = isArray(a) && isArray(b);
	if (!areArray) {
		return false;
	}

	// Check array length
	if (a.length !== b.length) {
		return false;
	}

	// Check values
	if (orderTolerant) {
		for (let i = 0; i < a.length; i++) {
			const valueA = a[i];
			let hasOneEquality = false;
			for (let j = 0; j < b.length; j++) {
				const valueB = b[j];
				if (jeck(valueA, valueB, { orderTolerant, debug })) {
					hasOneEquality = true;
				}
			}

			if (!hasOneEquality) {
				return false;
			}
		}
	} else {
		for (let i = 0; i < a.length; i++) {
			const valueA = a[i];
			const valueB = b[i];

			if (!jeck(valueA, valueB, { orderTolerant, debug })) {
				return false;
			}
		}
	}

	return true;
}

function compareObjects(oA, oB, { orderTolerant, debug } = {}) {
	const areObject = isObject(oA) && isObject(oB);
	if (!areObject) {
		return false;
	}

	// Check object length
	if (Object.keys(oA).length !== Object.keys(oB).length) {
		return false;
	}

	for (const key in oA) {
		const valueA = oA[key];
		const valueB = oB[key];

		if (!jeck(valueA, valueB, { orderTolerant, debug })) {
			// if(debug){
			//   console.log(valueA, valueB)
			// }
			return false;
		}
	}

	return true;
}
