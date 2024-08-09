// This holds all streams as object
// {
// who
// stream
// }

// local, remote1, remote2+
// For more users you can check WebRTC SFU, and a Go implementation of if it call livekit 'https://docs.livekit.io'

export default (state = {}, action) => {
  if (action.type === "ADD_STREAM") {
    const copyState = { ...state };
    copyState[action.payload.who] = action.payload;
    return copyState;
  } else if (action.type === "LOGOUT_ACTION") {
    return {};
  } else {
    return state;
  }
};
