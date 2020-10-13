

const SET_CURRENT_SESSION = 'ui/SET_CURRENT_SESSION';
const SET_PINS = 'ui/SET_PINS';
const PIN_TAG = 'ui/PIN_TAG';


export const setCurrentSession = currentSession => {
  return ({
    type: SET_CURRENT_SESSION,
    currentSession,
  });
}

export const setPins = pins => {
  return ({
    type: SET_PINS,
    pins,
  });
}

export const pinTag = tag => {
  return ({
    type: PIN_TAG,
    tag,
  });
}

export default function uiReducer(state={ currentSession: {}, pinnedTags: []}, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case SET_CURRENT_SESSION:
      newState.currentSession = action.currentSession;
      return newState;
    case SET_PINS:
      newState.pinnedTags = action.pins;
      return newState;
    case PIN_TAG:
      const newPins = [...newState.pinnedTags, action.tag];
      newState.pinnedTags = newPins;
      return newState;
    default:
      return state;
  }
}
