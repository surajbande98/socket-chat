export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules.required) {
    return true;
  }

  if (rules.required) {
    isValid = isValid && value.trim() !== "";
  }

  if (rules.minLength) {
    isValid = isValid && value.length >= rules.minLength;
  }

  if (rules.maxLength) {
    isValid = isValid && value.length <= rules.maxLength;
  }

  return isValid;
};