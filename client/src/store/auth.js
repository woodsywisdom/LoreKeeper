import Cookies from 'js-cookie';
import {setCampaigns} from './campaigns';
import { clearCategories } from './categories';
import { clearCampaigns } from './campaigns';
import { clearTags } from './tags';
import { clearNotes } from './notes';
import { clearUi } from './ui';

const SET_USER = 'auth/SET_USER';


export const setUser = user => {
  return ({
    type: SET_USER,
    user,
  });
}

export const login = (username, password) => async (dispatch) => {
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const res = await fetch('/api/session/login/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token
    },
    body: JSON.stringify({ username, password, 'csrf_token': csrf_token }),
  });
  const data = await res.json();
  // loads campaigns into their own state and
  const campaigns = data.campaigns;
  dispatch(setCampaigns(campaigns));
  delete data.campaigns;

  if (res.ok && !data['errors']) {
    dispatch(setUser(data));
    res.data = data;
  } else {
    res.errors = data['errors'];
    // dispatch(registerErrors(data['errors']));
  }
  return res
}

export const logout = () => async (dispatch) => {
  const csrfToken = Cookies.get('XSRF-TOKEN');
  const res = await fetch('/api/session/logout/', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'XSRF-TOKEN': csrfToken,
    },
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(setUser({ id: null }));
    dispatch(clearCampaigns());
    dispatch(clearCategories());
    dispatch(clearTags());
    dispatch(clearNotes());
    dispatch(clearUi());
  } else {
    res.errors = data['errors'];
  }
  return res
}

export default function authReducer(state={ id: null }, action) {
  // const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
