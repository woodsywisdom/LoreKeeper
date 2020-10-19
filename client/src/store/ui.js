

const SET_CURRENT_CAMPAIGN = 'ui/SET_CURRENT_CAMPAIGN';
const SET_CURRENT_SESSION = 'ui/SET_CURRENT_SESSION';
const SET_PINS = 'ui/SET_PINS';
const PIN_TAG = 'ui/PIN_TAG';
const UNPIN_TAG = 'ui/UNPIN_TAG';
const CLEAR_UI = 'ui/CLEAR_UI';
const OPEN_LOGIN = 'ui/OPEN_LOGIN';
const CLOSE_LOGIN = 'ui/CLOSE_LOGIN';
const EDIT_TAG = 'ui/EDIT_TAG';


export const setCurrentCampaign = currentCampaign => {
  return ({
    type: SET_CURRENT_CAMPAIGN,
    currentCampaign,
  });
}

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

export const unpinTag = position => {
  return ({
    type: UNPIN_TAG,
    position,
  });
}

export const setTagToEdit = tag => {
  return ({
    type: EDIT_TAG,
    tag,
  });
}

export const openLogin = () => {
  return ({
    type: OPEN_LOGIN,
  });
}

export const closeLogin = () => {
  return ({
    type: CLOSE_LOGIN,
  });
}

export const clearUi = () => {
  return ({
    type: CLEAR_UI,
  });
}

const defaultState = {
  currentSession: {},
  pinnedTags: [],
  currentCampaign: {},
  tagToEdit: {},
  loginOpen: false,
}

export default function uiReducer(state=defaultState, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case SET_CURRENT_CAMPAIGN:
      newState.currentCampaign = action.currentCampaign;
      return newState;
    case SET_CURRENT_SESSION:
      newState.currentSession = action.currentSession;
      return newState;
    case SET_PINS:
      newState.pinnedTags = action.pins;
      return newState;
    case PIN_TAG:
      newState.pinnedTags = [...newState.pinnedTags, action.tag];
      return newState;
    case UNPIN_TAG:
      newState.pinnedTags = [...newState.pinnedTags.slice(0, action.position),
                            ...newState.pinnedTags.slice(action.position + 1)];
      return newState;
    case EDIT_TAG:
      newState.tagToEdit = {...action.tag};
      return newState;
    case OPEN_LOGIN:
      newState.loginOpen = true;
      return newState;
    case CLOSE_LOGIN:
      newState.loginOpen = false;
      return newState;
    case CLEAR_UI:
      return defaultState;
    default:
      return state;
  }
}
