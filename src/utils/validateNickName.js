import { checkSpecialCharacter } from "./validateUserName";

const checkLengthNickName = (nickname) => {
  return nickname.length <= 12 ? true : false;
};
export const validateNickName = (nickname) => {
  return checkLengthNickName(nickname) && checkSpecialCharacter(nickname)
};
