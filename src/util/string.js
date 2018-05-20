export function formatMoneySeparated(moneyStr) {
  if(Math.abs(moneyStr).toString().length < 4) return parseInt(moneyStr).toString();
  return `${formatMoneySeparated(moneyStr.substr(0, moneyStr.length - 3))},${moneyStr.substr(-3)}`;
}

export const symmetryformatMoneySeparated = (moneyStr) => {
  return moneyStr.replace(/,/gi, '');
}

export const formatMoneyKo = (moneyStr) => {
  const preSymbol = parseInt(moneyStr) < 0 ? '-' : '';
  const moreThan4Digit = Math.abs(moneyStr.substr(0, moneyStr.length - 4));
  const lessThan4Digit = parseInt(moneyStr.substr(-4));
  const moreThan4DigitStr = `${moreThan4Digit ? moreThan4Digit.toString() : ''}${moreThan4Digit ? '만' : ''}`;
  let lessThan4DigitStr;
  if (lessThan4Digit) {
    lessThan4DigitStr = lessThan4Digit.toString();
  } else if (moreThan4DigitStr) {
    lessThan4DigitStr = '';
  } else {
    lessThan4DigitStr = '0';
  }
  return `${preSymbol}${moreThan4DigitStr}${moreThan4DigitStr && ' '}${lessThan4DigitStr}원`;
};
