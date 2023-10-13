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
    typeConfirm: ""
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
    default:
      return { ...state };
  }
};

export default adminDialogReducer;
