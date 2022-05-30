export function jsonf(data) {
  return JSON.stringify(data, null, 2);
}

export function normalizeBooleanString(value) {
  if (value === '') { return undefined; }
  return value === 'true';
}

export function normalizeOptionalInput(value) {
  if (value === '') { return undefined; }
  return value;
}
