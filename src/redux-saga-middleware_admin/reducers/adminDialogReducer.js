import { REHYDRATE } from "redux-persist";

export const openCreateDialog = (data) => {
  return {
    type: "OPEN_CREATE_DIALOG",
    payload: data,
  };
};

export const closeCreateDialog = (data) => {
  return {
    type: "CLOSE_CREATE_DIALOG",
    payload: data,
  };
};

export const openProvideDialog = (data) => {
  return {
    type: "OPEN_PROVIDE_DIALOG",
    payload: data,
  };
};

export const closeProvideDialog = (data) => {
  return {
    type: "CLOSE_PROVIDE_DIALOG",
    payload: data,
  };
};

export const openDetailDialog = (data) => {
  return {
    type: "OPEN_DETAIL_DIALOG",
    payload: data,
  };
};

export const closeDetailDialog = (data) => {
  return {
    type: "CLOSE_DETAIL_DIALOG",
    payload: data,
  };
};

export const openDrawerNav = (data) => {
  return {
    type: "OPEN_DRAWER_NAV",
    payload: data,
  };
};

export const closeDrawerNav = (data) => {
  return {
    type: "CLOSE_DRAWER_NAV",
    payload: data,
  };
};

export const openResetPassDialog = (data) => {
  return {
    type: "OPEN_RESET_PASS_DIALOG",
    payload: data
  }
}

export const closeResetPassDialog = (data) => {
  return {
    type: "CLOSE_RESET_PASS_DIALOG",
    payload: data
  }
}

export const openGivePerDialog = (data) => {
  return {
    type: "OPEN_GIVE_PER_DIALOG",
    payload: data
  }
}

export const closeGivePerDialog = (data) => {
  return {
    type: "CLOSE_GIVE_PER_DIALOG",
    payload: data
  }
}

export const openConfirmDialog = (data) => {
  return {
    type: "OPEN_CONFIRM_DIALOG",
    payload: data
  }
}

export const closeConfirmDialog = (data) => {
  return {
    type: "CLOSE_CONFIRM_DIALOG",
    payload: data
  }
}

export const openUpdateAccountDialog = (data) => {
  return {
    type: "OPEN_UPDATE_ACCOUNT_DIALOG",
    payload: data
  }
}

export const closeUpdateAccountDialog = (data) => {
  return {
    type: "CLOSE_UPDATE_ACCOUNT_DIALOG",
    payload: data
  }
}

export const openRefcodeNotify = (data) => {
  return {
    type: "OPEN_REF_CODE_NOTIFY",
    payload: data
  }
}

export const closeRefcodeNotify = (data) => {
  return {
    type: "CLOSE_REF_CODE_NOTIFY",
    payload: data
  }
}

export const openScanQRCode = (data) => {
  return {
    type: "OPEN_SCAN_QR_CODE",
    payload: data
  }
}

export const closeScanQRCode = (data) => {
  return {
    type: "CLOSE_SCAN_QR_CODE",
    payload: data
  }
}

export const openShareQrCode = (data) => {
  return {
    type: "OPEN_SHARE_QR_CODE",
    payload: data
  }
}

export const closeShareQrCode = (data) => {
  return {
    type: "CLOSE_SHARE_QR_CODE",
    payload: data
  }
}

const adminDialogReducer = (
  state = {
    isCreateDialog: false,
    isProvideDialog: false,
    isDetailDialog: false,
    isOpenDrawerNav: false,
    isResetPassDialog: false,
    isGivePerDialog: false,
    isConfirmDialog: false,
    isUpdateAccountDialog: false,
    typeConfirm: "",
    isRefcodeDialog : false,
    typeRefcode: "error",
    messageRefcode: "",
    isOpenQRCode: false,
    isShareQrCode: false
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "OPEN_CREATE_DIALOG":
      return { ...state, isCreateDialog: true };
    case "CLOSE_CREATE_DIALOG":
      return { ...state, isCreateDialog: false };
    case "OPEN_PROVIDE_DIALOG":
      return { ...state, isProvideDialog: true };
    case "CLOSE_PROVIDE_DIALOG":
      return { ...state, isProvideDialog: false };
    case "OPEN_DETAIL_DIALOG":
      return { ...state, isDetailDialog: true };
    case "CLOSE_DETAIL_DIALOG":
      return { ...state, isDetailDialog: false };
    case "OPEN_DRAWER_NAV":
      return { ...state, isOpenDrawerNav: true };
    case "CLOSE_DRAWER_NAV":
      return { ...state, isOpenDrawerNav: false };
    case "OPEN_RESET_PASS_DIALOG": return {...state, isResetPassDialog: true}
    case "CLOSE_RESET_PASS_DIALOG": return {...state, isResetPassDialog: false}
    case "OPEN_GIVE_PER_DIALOG": return {...state, isGivePerDialog: true}
    case "CLOSE_GIVE_PER_DIALOG": return {...state, isGivePerDialog: false}
    case "OPEN_CONFIRM_DIALOG":  return {...state, isConfirmDialog: true, typeConfirm: payload || ""}
    case "CLOSE_CONFIRM_DIALOG":  return {...state, isConfirmDialog: false, typeConfirm: ""}
    case "OPEN_UPDATE_ACCOUNT_DIALOG": return {...state, isUpdateAccountDialog: true}
    case "CLOSE_UPDATE_ACCOUNT_DIALOG": return {...state, isUpdateAccountDialog: false}
    case "OPEN_SCAN_QR_CODE": return {...state, isOpenQRCode: true}
    case "CLOSE_SCAN_QR_CODE": return {...state, isOpenQRCode: false}
    case "OPEN_REF_CODE_NOTIFY": return {...state, isRefcodeDialog: true, typeRefcode: payload?.type || "", messageRefcode: payload?.message || ""}
    case "CLOSE_REF_CODE_NOTIFY": return {...state, isRefcodeDialog: false, typeRefcode: "", messageRefcode: ""}
    case "OPEN_SHARE_QR_CODE": return {...state, isShareQrCode: true}
    case "CLOSE_SHARE_QR_CODE": return {...state, isShareQrCode: false}
    default:
      return { ...state };
  }
};

export default adminDialogReducer;
