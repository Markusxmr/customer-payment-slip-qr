const FormatCurrency = (value) => {
	if (value == '') {
		return '';
	}

	value = value.split(',');

	let decimale = value[1];

	decimale = decimale ? decimale : '00';
	decimale =
		decimale.length == 1
			? decimale + '0'
			: decimale.length == 2
			? decimale
			: decimale.substring(0, 2);

	return value[0] + ',' + decimale;
};

const FormatIntegerToDecimal = (value, options = {}) => {
	// Return an empty string for null, undefined, or empty values
	if (value === null || value === undefined || value === '') return '';

	// Determine the decimal separator:
	// If options.dot is true, use a dot; otherwise use a comma.
	const separator = options.dot ? '.' : ',';

	// If the value is a number, assume it's a whole number and format it.
	// This will output 19 as "19.00" (or "19,00").
	if (typeof value === 'number') {
		return value.toFixed(2).replace('.', separator);
	}

	// Ensure we work with a string
	const valueStr = String(value);

	// If the string already contains a decimal separator, return it as is.
	if (valueStr.includes('.') || valueStr.includes(',')) {
		return valueStr;
	}

	// If the string has more than 2 characters, we assume that the last two digits are decimals.
	// For example, "1901" becomes "19" and "01" → "19.01"
	if (valueStr.length > 2) {
		const integerPart = valueStr.slice(0, -2);
		const decimalPart = valueStr.slice(-2);
		return `${integerPart}${separator}${decimalPart}`;
	}

	// Otherwise, if the string is 1 or 2 characters long,
	// assume it's a whole number and append the two decimal zeros.
	return `${valueStr}${separator}00`;
};

export { FormatIntegerToDecimal, FormatCurrency };
