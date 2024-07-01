const isNumericString = (value: string) => {
	// only numbers, comma and dot

	if (!value || typeof value !== 'string') return false;

	// const regex = /^[0-9,.]*$/;
	const regex = /^-?[0-9,.]*$/;

	const hasMultiplesComma = value.split('').filter((item) => item === ',').length > 1;
	const hasMultiplesDots = value.split('').filter((item) => item === '.').length > 1;

	if (hasMultiplesComma && hasMultiplesDots) return false;

	return regex.test(value);
};

export const numericStringToNumber = (string: string) => {
	if (!string || !isNumericString(string)) {
		// throw new Error(`string is not a numeric string --> ${string}`);
		return NaN;
	}

	const hasComma = string.includes(',');
	const hasDot = string.includes('.');
	const hasMultiplesDots = string.split('').filter((item) => item === '.').length > 1;
	/* 
    ACCEPT THE FOLLOWING FORMATS AND CONVERT TO FLOAT
		1000.50
		1000
		2,200,100.50 --> NEED TO CONVERT
		2.200.100,50 --> NEED TO CONVERT
		1.100,50 --> NEED TO CONVERT
		1000,50 --> NEED TO CONVERT
    */
	if (hasMultiplesDots) {
		string = string.replaceAll('.', '');
		string = string.replaceAll(',', '.');
		return Number(string);
	}

	if (hasComma && !hasDot) {
		return Number(string.replaceAll(',', '.'));
	}

	if (hasComma && hasDot) {
		const indexOfComma = string.indexOf(',');
		const indexOfDot = string.indexOf('.');
		if (indexOfComma < indexOfDot) {
			string = string.replaceAll(',', '');
			return Number(string);
		}
		if (indexOfComma > indexOfDot) {
			string = string.replaceAll('.', '');
			string = string.replaceAll(',', '.');
			return Number(string);
		}
	}

	return Number(string);
};
