

const SET_CURRENT_SESSION = 'ui/SET_CURRENT_SESSION';
const PIN_TAG = 'ui/PIN_TAG';


export const setCurrentSession = currentSession => {
  return ({
    type: SET_CURRENT_SESSION,
    currentSession,
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
    case PIN_TAG:
      newState.pinnedTags.push(action.tag);
      return newState;
    default:
      return state;
  }
}
