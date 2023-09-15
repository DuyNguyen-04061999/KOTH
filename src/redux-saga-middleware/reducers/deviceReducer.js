export const updateDeviceType = (data) => {
  return {
    type: "UPDATE_DEVICE_TYPE",
    payload: data,
  };
};
export const updateDevice = (data) => {
  return {
    type: "UPDATE_DEVICE",
    payload: data,
  };
};
const deviceReducer = (
  state = {
    deviceType: "",
    device: "",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DEVICE_TYPE":
      return {
        ...state,
        deviceType: payload,
      };
    case "UPDATE_DEVICE":
      return {
        ...state,
        device: payload,
      };
    default:
      return { ...state };
  }
};

export default deviceReducer;
