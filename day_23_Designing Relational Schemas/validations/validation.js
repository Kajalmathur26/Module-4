// validations/validation.js
function validateUserInput(name, email, password) {
  if (!name || !email || !password) return false;
  return true;
}

module.exports = { validateUserInput };
