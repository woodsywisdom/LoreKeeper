import Cookies from 'js-cookie';

const SET_TAGS = 'tags/SET_TAGS';
const ADD_TAG = 'campaigns/ADD_TAG';


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

// export const getTags = () => async dispatch => {
//   const csrf_token = Cookies.get('XSRF-TOKEN');

//   const res = await fetch('/api/tags/', {
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRFTOKEN': csrf_token
//     },
//   });
//   const data = await res.json();
//   if (res.ok) {
//     dispatch(setTags(data));
//   }
//   return res;
// }

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

export default function tagReducer(state={}, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    case ADD_TAG:
      newState[action.tag.id] = action.tag;
      return newState;
    default:
      return state;
  }
}
