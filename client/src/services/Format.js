const FormatCurrency = (value) => {
  if (value == "") {
    return "";
  }

  value = value.split(",");

  let decimale = value[1];

  decimale = decimale ? decimale : "00";
  decimale =
    decimale.length == 1
      ? decimale + "0"
      : decimale.length == 2
      ? decimale
      : decimale.substring(0, 2);

  return value[0] + "," + decimale;
};

const Format = (value) => {
  if (value == "" || !value) {
    return "";
  }
  if (typeof value === "number") {
    value = value.toString();
  }

  let round = `${value.substring(0, value.length - 2)}`;
  let decimale = `${value.charAt(value.length - 2)}${value.charAt(
    value.length - 1
  )}`;
  return `${round},${decimale}`;
};

export { Format, FormatCurrency };
