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

export const updateContacterUsername = (userName, id) => {
  return {
    type: "UPDATE_CONTACTER_USERNAME",
    payload: {
      userName: userName,
      id: id,
    },
  };
};

export const toggleInviteGameDialog = (data) => {
  return {
    type: "TOGGLE_INVITE_GAME_DIALOG",
    payload: data,
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

const chatReducer = (
  state = {
    chatWorld: [],
    friendList: [],
    contacter: {},
    isInviteGameDialog: false,
    typeInvite: "",
    chatPopup: true,
    privateChatPopup: false,
    tabChat: true,
    badgechat: false,
    openMess: false,
    openMenu: false,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
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
    case "PUSH_FRIEND_LIST": {
      return {
        ...state,
        friendList: payload,
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
    case "TOGGLE_INVITE_GAME_DIALOG":
      return {
        ...state,
        isInviteGameDialog: !state.isInviteGameDialog,
        typeInvite: payload?.type || "",
      };
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
        isInviteGameDialog: false,
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
