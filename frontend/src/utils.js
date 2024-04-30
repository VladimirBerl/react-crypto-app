// Найти процентную разницу монеты
export function precentDifference(a, b) {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}
// Заглавная буква
export function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
}
