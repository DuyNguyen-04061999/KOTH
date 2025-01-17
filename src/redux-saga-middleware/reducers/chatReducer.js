export const pushChatWorld = (data) => {
  return {
    type: "PUSH_CHAT_WORLD",
    payload: data,
  };
};
export const pushfriendList = (data) => {
  return {
    type: "PUSH_FRIEND_LIST",
    payload: data,
  };
};
export const updateFriendList = (data) => {
  return {
    type: "UPDATE_ADD_FRIEND",
    payload: data,
  };
};
export const updateChatWorld = (data) => {
  return {
    type: "UPDATE_CHAT_WORLD",
    payload: data,
  };
};

export const showBadgeChat = (data) => {
  return {
    type: "SHOW_BADGE_CHAT",
    payload: data,
  };
};

export const updateContacterUsername = (userName, id, isMod) => {
  return {
    type: "UPDATE_CONTACTER_USERNAME",
    payload: {
      userName: userName,
      id: id,
      isMod: isMod,
    },
  };
};

export const openChatPopup = () => {
  return {
    type: "OPEN_CHAT_POPUP",
    payload: "",
  };
};
export const closeChatPopup = () => {
  return {
    type: "CLOSE_CHAT_POPUP",
    payload: "",
  };
};

export const clickTabChat = (data) => {
  return {
    type: "CLICK_TAB_CHAT",
    payload: data,
  };
};

export const setBadgeChat = (data) => {
  return {
    type: "SET_BADGE_CHAT",
    payload: data,
  };
};

export const chatLogoutSuccessFully = (data) => {
  return {
    type: "CHAT_LOGOUT_SUCCESS_FULLT",
    payload: data,
  };
};
export const updateOpenMess = (data) => {
  return {
    type: "UPDATE_OPEN_MESS",
    payload: data,
  };
};
export const updateOpenMenu = (data) => {
  return {
    type: "UPDATE_OPEN_MENU",
    payload: data,
  };
};

export const updateFriendNickName = (data) => {
  return {
    type: "UPDATE_FRIEND_NICKNAME",
    payload: data,
  };
};
export const updateBannedChatWorld = (data) => {
  return {
    type: "UPDATE_BANNED_CHAT_WORLD",
    payload: data,
  };
};
export const updateUnBannedChatWorld = (data) => {
  return {
    type: "UPDATE_UNBANNED_CHAT_WORLD",
    payload: data,
  };
};
export const updateFriendChat = (data) => {
  return {
    type: "UPDATE_FRIEND_CHAT",
    payload: data,
  };
};
export const updateCurrentContacter = (data) => {
  return {
    type: "UPDATE_CURRENT_CONTACTER",
    payload: data,
  };
};
export const openDeleteChatConfirmPopup = (data) => {
  return {
    type: "OPEN_DELETE_CHAT_CONFIRM_POPUP",
    payload: data,
  };
};
export const clostDeleteChatConfirmPopup = (data) => {
  return {
    type: "CLOSE_DELETE_CHAT_CONFIRM_POPUP",
    payload: data,
  };
};
export const deleteChatReady = (data) => {
  return {
    type: "DELETE_CHAT_READY",
    payload: data,
  };
};
export const deleteChatSuccess = (data) => {
  return {
    type: "DELETE_CHAT_SUCCESS",
    payload: data,
  };
};
export const deleteChatFail = (data) => {
  return {
    type: "DELETE_CHAT_FAIL",
    payload: data,
  };
};

const chatReducer = (
  state = {
    chatWorld: [],
    friendList: [],
    contacter: {},
    typeInvite: "",
    chatPopup: true,
    privateChatPopup: false,
    tabChat: true,
    badgechat: false,
    openMess: false,
    openMenu: false,
    userFriendNickName: "",
    openFriendChat: false,
    currContacter: {},
    //-------------------- Delete chat --------------------
    isOpenConfirmDelete: false,
    isDeleteChatReady: false,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case "OPEN_DELETE_CHAT_CONFIRM_POPUP": {
      return {
        ...state,
        isOpenConfirmDelete: true,
      };
    }
    case "CLOSE_DELETE_CHAT_CONFIRM_POPUP": {
      return {
        ...state,
        isOpenConfirmDelete: false,
      };
    }
    case "DELETE_CHAT_READY": {
      return {
        ...state,
        isDeleteChatReady: true,
      };
    }
    case "DELETE_CHAT_FAIL": {
      return {
        ...state,
        isDeleteChatReady: false,
      };
    }
    case "DELETE_CHAT_SUCCESS": {
      return {
        ...state,
        isDeleteChatReady: false,
        chatWorld: state.chatWorld?.map((item) => {
          if (item?.id === payload) {
            return { ...item, isDeleted: true };
          }
          return item;
        }),
      };
    }
    case "UPDATE_CURRENT_CONTACTER": {
      return {
        ...state,
        currContacter: payload,
      };
    }
    case "PUSH_CHAT_WORLD": {
      return {
        ...state,
        chatWorld: payload && payload?.length > 0 ? payload?.reverse() : [],
      };
    }
    case "UPDATE_CONTACTER_USERNAME": {
      return {
        ...state,
        contacter: payload,
      };
    }
    case "UPDATE_FRIEND_NICKNAME":
      return { ...state, userFriendNickName: payload || "" };
    case "PUSH_FRIEND_LIST": {
      return {
        ...state,
        friendList: payload,
      };
    }
    case "UPDATE_BANNED_CHAT_WORLD": {
      return {
        ...state,
        chatWorld: state.chatWorld?.map((item) => {
          if (item?.messageFromName === payload) {
            return { ...item, isActiveSender: false };
          }
          return item;
        }),
      };
    }
    case "UPDATE_UNBANNED_CHAT_WORLD": {
      return {
        ...state,
        chatWorld: state.chatWorld?.map((item) => {
          if (item?.messageFromName === payload) {
            return { ...item, isActiveSender: true };
          }
          return item;
        }),
      };
    }
    case "UPDATE_CHAT_WORLD": {
      return {
        ...state,
        chatWorld: [...state.chatWorld, payload],
      };
    }
    case "UPDATE_ADD_FRIEND": {
      return {
        ...state,
        friendList: [...state.friendList, payload],
      };
    }
    case "OPEN_CHAT_POPUP": {
      return {
        ...state,
        chatPopup: true,
      };
    }

    case "CLOSE_CHAT_POPUP": {
      return {
        ...state,
        chatPopup: false,
      };
    }

    case "CLICK_TAB_CHAT": {
      return {
        ...state,
        tabChat: payload,
      };
    }
    case "SHOW_BADGE_CHAT": {
      return {
        ...state,
        badgechat: payload,
      };
    }

    case "SET_BADGE_CHAT": {
      return {
        ...state,
        badgechat: payload,
      };
    }

    case "CHAT_LOGOUT_SUCCESS_FULLT": {
      return {
        ...state,
        friendList: [],
        contacter: {},
        typeInvite: "",
        chatPopup: false,
        privateChatPopup: false,
        tabChat: true,
      };
    }
    case "UPDATE_OPEN_MESS": {
      return {
        ...state,
        openMess: payload,
      };
    }
    case "UPDATE_FRIEND_CHAT": {
      return {
        ...state,
        openFriendChat: payload,
      };
    }
    case "UPDATE_OPEN_MENU": {
      return {
        ...state,
        openMenu: payload,
      };
    }
    default:
      return { ...state };
  }
};

export default chatReducer;
