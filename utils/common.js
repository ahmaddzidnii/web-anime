export function parseBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const val = value.trim().toLowerCase();
    return val === "true" || val === "1";
  }
  if (typeof value === "number") return value === 1;
  return false;
}
