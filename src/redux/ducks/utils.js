export function generateId() {
  return Date.now()
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}