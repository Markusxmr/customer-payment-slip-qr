/**
 *
 * izracun kontrolnog broja po modulu 11 ili u HR mod11ini
 */
export function controlNumber(x: number = 0) {
  let s = x.toString();
  let i = 0;
  let v = 0;
  let p = 2;
  let c = 0;
  for (i = s.length; i >= 1; i--) {
    c = Number(s.substr(i - 1, 1));
    if (0 <= c && c <= 9 && v >= 0) {
      v = v + p * c;
      p = p + 1;
    } else {
      v = -1;
    }
  }
  if (v >= 0) {
    v = 11 - (v % 11);
    if (v > 9) {
      v = 0;
    }
  }
  return v;
}
