import Cookies from 'js-cookie';

import { addTags } from './tags';

const ADD_NOTE = 'notes/ADD_NOTE';

export const addNote = note => {
  return ({
    type: ADD_NOTE,
    note,
  });
}

export const createNote = (noteContent, hashtagIds, campaignId, newHashtags) => async dispatch => {
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const body = JSON.stringify({noteContent, hashtagIds, newHashtags, 'csrf_token': csrf_token})
  const res = await fetch(`/api/campaigns/${campaignId}/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token,
    },
    body,
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    const { newNote, newTags } = data;
    dispatch(addNote(newNote));
    dispatch(addTags(newTags));
    debugger

    res.errors = [];
  } else {
    res.errors = data.errors;
  }
  return res;
}


export default function noteReducer(state={}, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case ADD_NOTE:
      const newNote = action.note;
      newState[newNote.id] = newNote;
      return newState;
    default:
      return state;
  }
}
