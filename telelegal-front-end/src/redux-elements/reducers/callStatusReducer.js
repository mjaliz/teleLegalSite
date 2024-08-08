const initState = {
  current: "idle", // negotiating, progress, complete
  video: false, // video is NOT on
  audio: false, // audio is NOT on
  audioDevice: "default", // enumerate devices, choosen audio device
  videoDevice: "default",
  shareScreen: false,
  haveMedia: false, // Is there a lcoalStream, has getUserMedia been run?
};

export default (state = initState, action) => {
  if (action.type === "UPDATE_CALL_STATUS") {
    const copyState = { ...state };
    copyState[action.payload.prop] = action.payload.value;
    return copyState;
  } else if (action.type === "LOGOUT_ACTION" || action.type === "NEW_VERSION") {
    return initState;
  } else {
    return state;
  }
};
