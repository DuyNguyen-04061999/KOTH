const checkWhiteSpace = (email) => {
  return /\s/.test(email);
};

const checkTheTail = (email) => {
  return /[a-zA-Z]+(\.[a-zA-Z]+)*(\.[a-zA-Z]+)$/.test(email);
};
export const validateEmail = (email) => {
  if (!checkWhiteSpace(email) && checkTheTail(email)) {
    return true;
  } else return false;
};
