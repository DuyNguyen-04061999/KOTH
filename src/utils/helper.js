import moment from "moment";

const convertToVietnameseWithAccent = (text) => {
    const unicodeTable = {
      'a': 'áàảãạăắằẳẵặâấầẩẫậ',
      'e': 'éèẻẽẹêếềểễệ',
      'i': 'íìỉĩị',
      'o': 'óòỏõọôốồổỗộơớờởỡợ',
      'u': 'úùủũụưứừửữự',
      'y': 'ýỳỷỹỵ',
      'd': 'đ'
    };

    let result = '';
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      let convertedChar = char;
      for (let key in unicodeTable) {
        if (unicodeTable.hasOwnProperty(key) && unicodeTable[key].includes(char)) {
          convertedChar = key;
          break;
        }
      }
      result += convertedChar;
    }
    return result;
} 

function getUniqueID() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

function formatMoney(number) {
  return Number(number).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace("$", "");
}

function getAppType () {
  return process.env.REACT_APP_TYPE_APP || "";
}

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function sliceString(str) {
  if(str && String(str)?.length > 10) {
    return String(str)?.slice(0, 10)
  }
  return str
}

function formatTimeMothDateYear(time) {
  return moment(time).format("MM/DD/YYYY hh:mm a")
}

export {
    convertToVietnameseWithAccent,
    getUniqueID,
    formatMoney,
    getAppType,
    isJson,
    sliceString,
    formatTimeMothDateYear
}


