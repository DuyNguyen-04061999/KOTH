export const authNotification = {
  signUp: {
    userNameExist: {
      case: "should fail if username does exist",
      type: "error",
      message: "Username already taken. Please choose a different one.",
    },
    emailNotUnique: {
      case: "should fail if email is not unique",
      type: "error",
      message: "Email already in use. Please log in or use a different email.",
    },
    emailNotUnique: {
      case: "should fail if phone is not unique",
      type: "error",
      message:
        "Phone number already in use. Please log in or use a different phone number.",
    },
    phoneNotUnique: {
      case: "should fail if phone is not unique",
      type: "error",
      message:
        "Phone number already in use. Please log in or use a different phone number.",
    },
    invalidRefcode: {
      case: "Khi nhập sai refcode",
      type: "error",
      message:
        "Invalid Referral Code. Please double-check the code and input again or leave this field blank to sign up.",
    },
    invalidInput: {
      case: "Khi chưa nhập đủ thông tin mà đã bấm sign up",
      type: "warning",
      message: "Please complete all required information before signing up.",
    },
    signUpSuccess: {
      case: "should success if register a user with valid input",
      type: "success",
      message: "Registration successful! Welcome to Play4promo.",
    },
  },
  signIn: {
    userNameNotExist: {
      case: "should fail if user does not exist ",
      type: "warning",
      message: "This username does not exist. Please try again.",
    },
    passwordIncorrect: {
      case: "should fail if password is incorrect",
      type: "warning",
      message: "The password you entered is invalid. Please try again.",
    },
    invalidInput: {
      case: "Khi không nhập username hoặc password",
      type: "warning",
      message: "Please enter your username and password to sign in.",
    },
    loggedAnotherDevice: {
      case: "Khi tài khoản đang đăng nhập trên thiết bị khác",
      type: "warning",
      message:
        "You're currently logged in on another device. Please sign out there to continue here.",
    },
    signInSuccess: {
      case: "Khi đăng nhập thành công",
      type: "success",
      message: "Login successfully!",
    },
  },
  signOut: {
    logoutSuccess: {
      case: "Khi đăng xuất thành công",
      type: "success",
      message: "You have been successfully logged out.",
    },
  },
  verifyAccount: {
    invalidOTP: {
      case: "Khi nhập sai OTP",
      type: "error",
      message: "Invalid OTP. Please check and re-enter the code.",
    },
    verifySuccess: {
      case: "Khi nhập OTP đúng",
      type: "success",
      message: "OTP Verified. You're successfully verified!",
    },
  },
  forgotPassword: {
    emailNotMatch: {
      case: "Khi nhập email không khớp với username",
      type: "error",
      message: "The email provided does not match the username.",
    },
    userNameNotExist: {
      case: "Khi nhập sđt không khớp với username",
      type: "error",
      message: "The phone number provided does not match the username.",
    },
    phoneNotMatch: {
      case: "Khi nhập username không tồn tại",
      type: "error",
      message: "This username does not exist. Please try again.",
    },
  },
  otpForgotPassword: {
    invalidOTP: {
      case: "Khi nhập sai OTP",
      type: "error",
      message: "Invalid OTP. Please check and re-enter the code.",
    },
    validOTP: {
      case: "Khi nhập OTP đúng",
      type: "success",
      message: "OTP Verified. You're successfully verified!",
    },
  },
  createPassword: {
    invalidPassword: {
      case: "Khi tạo mật khẩu mới mà giống mật khẩu cũ",
      type: "warning",
      message:
        "Current and new password should not be the same. Please try another one!",
    },
    createPasswordSuccess: {
      case: "Khi reset password thành công",
      type: "succes",
      message: "Reset password successfully!",
    },
  },
};

export const paymentNotification = {
  payment: {
    paymentSuccess: {
      case: "Khi nạp tiền thành công",
      type: "succes",
      message:
        "Payment Successful. Your payment has been successfully processed.",
    },
    paymentFail: {
      case: "Khi nạp tiền thất bại",
      type: "error",
      message: "Payment Fail. There's something wrong. Please try again.",
    },
  },
};

export const promotionNotification = {
  promoDetail: {
    joinPromoSuccess: {
      case: "Khi join promo thành công",
      type: "success",
      message: "You're in! Get ready for the promotion excitement.",
    },
    promoNotStart: {
      case: "Click Play promo đã join nhưng chưa tới thời gian bắt đầu",
      type: "warning",
      message: "Tournament not started yet. Please check back later to join.",
    },
  },
  shareLink: {
    shareLinkSuccess: {
      case: "Khi copy link ở pop up share",
      type: "success",
      message: "Copy link successfully",
    },
  },
  buyExtra: {
    buyExtraSuccess: {
      case: "Khi mua pack thành công",
      type: "success",
      message: "Package purchase successful. Enjoy the benefits!",
    },
    buyExtraFail: {
      case: "Khi mua thêm subscription pack dù đã mua rồi",
      type: "warning",
      message: "You've already bought this pack. It's currently active.",
    },
  },
};

export const userNotification = {
  updateProfile: {
    invalidImageFormat: {
      case: "Khi chọn ảnh sai định dạng ",
      type: "error",
      message:
        "Avatar upload failed: Unsupported file type. Please use <định dạng> or <định dạng>",
    },
    invalidImageSize: {
      case: "Khi chọn ảnh quá dung lượng mà web cho phép",
      type: "error",
      message:
        "Avatar upload failed: File size exceeds <dung lượng> MB. Please choose a smaller file.",
    },
    emailExist: {
      case: "Khi nhập email hoặc sđt đã dùng",
      type: "error",
      message:
        "Unable to update profile: Email or phone number already in use.",
    },
    updateProfileSuccess: {
      case: "Khi update profile thành công",
      type: "success",
      message: "Profile update successful! Your changes have been saved.",
    },
  },
};

export const chatNotification = {
  chat: {
    messageTooLong: {
      case: "Khi gửi lên chatbox tin nhắn quá dài",
      type: "warning",
      message: "Can't send messages that are too long!",
    },
  },
};

export const systemNotification = {
  maintenance: {
    serviceClose:{
      case:"Khi service bị đóng để bảo trì",
      type:"warning",
      message:"Sorry for the inconvenience. The server is currently overloaded. Please try again later."
    }
  },
};
