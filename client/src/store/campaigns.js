import Cookies from 'js-cookie';

const SET_CAMPAIGNS = 'campaigns/SET_CAMPAIGNS';
const ADD_CAMPAIGN = 'campaigns/ADD_CAMPAIGN';


export const setCampaigns = campaigns => {
  return ({
    type: SET_CAMPAIGNS,
    campaigns,
  });
}

export const addCampaign = campaign => {
  return ({
    type: ADD_CAMPAIGN,
    campaign,
  });
}

export const newCampaign = (title, description, userId) => async dispatch => {
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const res = await fetch('/api/campaigns/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token
    },
    body: JSON.stringify({ title, description, 'csrf_token': csrf_token }),
  });
  const data = res.json();
  const campaign = data.campaign;
  if (res.ok && !data['errors']) {
    dispatch(addCampaign(campaign));
  } else {
    res.errors = data.errors
  }
  return res
}

export default function campaignReducer(state=[], action) {
  const newState = [...state];
  switch (action.type) {
    case SET_CAMPAIGNS:
      return action.campaigns;
    case ADD_CAMPAIGN:
      newState.push(action.campaign);
      return newState;
    default:
      return state;
  }
}
