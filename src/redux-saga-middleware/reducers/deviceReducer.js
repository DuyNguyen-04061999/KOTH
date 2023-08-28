export const updateDeviceType = (data) => {
  return {
    type: "UPDATE_DEVICE",
    payload: data,
  };
};
const deviceReducer = (
  state = {
    deviceType: "",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DEVICE":
      return {
        ...state,
        deviceType: payload,
      };
    default:
      return { ...state };
  }
};

export default deviceReducer;
