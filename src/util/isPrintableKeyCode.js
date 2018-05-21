export default (keyCode) => {
  const isPrintable =
    (keyCode > 47 && keyCode < 58)   || // number keys
    keyCode == 32 || keyCode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)
  return isPrintable;
};
