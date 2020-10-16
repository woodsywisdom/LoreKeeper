import Cookies from 'js-cookie';

const SET_TAGS = 'tags/SET_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const ADD_TAGS = 'tags/ADD_TAGS';
const MOVE_TAG = 'tags/MOVE_TAG';
const CLEAR_TAGS = 'tags/CLEAR_TAGS';


export const setTags = tags => {
  return ({
    type: SET_TAGS,
    tags,
  });
}

export const addTag = tag => {
  return ({
    type: ADD_TAG,
    tag,
  });
}

export const addTags = tags => {
  return ({
    type: ADD_TAGS,
    tags,
  });
}

export const moveTag = (tag, newCategoryId) => {
  return ({
    type: MOVE_TAG,
    tag,
    newCategoryId,
  });
}

export const clearTags = () => {
  return ({
    type: CLEAR_TAGS,
  });
}

export const recategorizeTag = (tag, newCategoryId) => async dispatch => {
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const body = {
    newCategoryId,
    tag,
  }
  const res = await fetch(`/api/tags/${tag.id}/`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (res.ok && !data.errors) {
    dispatch(moveTag(tag, newCategoryId));
  } else {
    res.errors = data.errors;
  }
  return res;
}

export const newTag = (name, campaign_id, category_id) => async dispatch => {
  const csrf_token = Cookies.get('XSRF-TOKEN');

  const res = await fetch('/api/tags/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token
    },
    body: JSON.stringify({ name, campaign_id, category_id, 'csrf_token': csrf_token }),
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(addTag(data));
  } else {
    res.errors = data.errors
  }
  return res
}

export default function tagReducer(state={ }, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    case ADD_TAG:
      newState[action.tag.name] = action.tag;
      return newState;
    case ADD_TAGS:
      Object.values(action.tags).forEach(tag => {
        newState[tag.name] = tag;
      });
      return newState;
    case MOVE_TAG:
      newState[action.tag.name].category_id = action.newCategoryId;
      return newState;
    case CLEAR_TAGS:
      return {};
    default:
      return state;
  }
}
