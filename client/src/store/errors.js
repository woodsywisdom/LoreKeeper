const SET_LOGIN = 'errors/SET_LOGIN';
const CLEAR_LOGIN = 'errors/CLEAR_LOGIN';
const SET_SIGNUP = 'errors/SET_SIGNUP';
const CLEAR_SIGNUP = 'errors/CLEAR_SIGNUP';



export const setLoginErrors = (errors) => {
  return ({
    type: SET_LOGIN,
    errors,
  });
}

export const clearLoginErrors = () => {
  return ({
    type: CLEAR_LOGIN,
  });
}

export const setSignUpErrors = (errors) => {
  return ({
    type: SET_SIGNUP,
    errors,
  })
}

export const clearSignUpErrors = () => {
  return ({
    type: CLEAR_SIGNUP,
  });
}


const defaultState = {
  login: [],
  signUp: [],
}

export default function errorReducer(state=defaultState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_LOGIN:
      newState.login.push([...action.errors]);
      return newState;
    case CLEAR_LOGIN:
      newState.login = [];
      return newState;
    case SET_SIGNUP:
      newState.signUp.push(...action.errors);
      return newState;
    case CLEAR_SIGNUP:
      newState.signUp = [];
      return newState;
    default:
      return state;
  }
}
