export function isJSON(input?: string) {
  if (!input) {
    return false;
  }

  try {
    JSON.parse(input);
  } catch (e) {
    return false;
  }

  return true;
}
