const checkLength = (username) => {
  if (username.length >= 3 && username.length <= 11) {
    return true;
  } else {
    return false;
  }
};
const checkAtLeastLetter = (username) => {
  return /[a-zA-Z]/.test(username);
};
const checkNumberUsername = (username) => {
  return /\d*/.test(username);
};
export const checkSpecialCharacter = (username) => {
  return /[^[a-zA-Z]+\.[a-zA-Z]{4,10}^]/.test(username);
};
export const checkWhiteSpace = (username) => {
  return /\s/.test(username);
};
export const validateUserName = (username) => {
  if (
    checkLength(username) &&
    checkAtLeastLetter(username) &&
    checkNumberUsername(username) &&
    !checkSpecialCharacter(username) &&
    !checkWhiteSpace(username)
  ) {
    return true;
  } else {
    return false;
  }
};
