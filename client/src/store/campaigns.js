import Cookies from 'js-cookie';

// import setCategories from './categories';
// import setTags from './tags';

const SET_CAMPAIGNS = 'campaigns/SET_CAMPAIGNS';
const ADD_CAMPAIGN = 'campaigns/ADD_CAMPAIGN';
const REMOVE_CAMPAIGN = 'campaigns/REMOVE_CAMPAIGN';


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

export const removeCampaign = campaignId => {
  return ({
    type: REMOVE_CAMPAIGN,
    campaignId,
  });
}

export const loadCampaigns = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}/campaigns/`);
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(setCampaigns(data.campaigns));
  } else {
    res.errors = data.errors
  }
  return res
}

export const newCampaign = (title, description) => async dispatch => {
  const csrf_token = Cookies.get('XSRF-TOKEN');

  const res = await fetch('/api/campaigns/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token
    },
    body: JSON.stringify({ title, description, 'csrf_token': csrf_token }),
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(addCampaign(data.campaign));
  } else {
    res.errors = data.errors
  }
  return res
}

export const deleteCampaign = campaignId => async dispatch => {
  const csrf_token = Cookies.get('XSRF-TOKEN');
  const res = await fetch(`/api/campaigns/${campaignId}/`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': csrf_token
    },
  });
  const data = await res.json();
  if (res.ok && !data['errors']) {
    dispatch(removeCampaign(campaignId));
  } else {
    res.errors = data.errors
  }
  return res
}


export default function campaignReducer(state={}, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_CAMPAIGNS:
      return action.campaigns;
    case ADD_CAMPAIGN:
      const newCampaign = action.campaign;
      newState[newCampaign.id] = newCampaign;
      return newState;
    case REMOVE_CAMPAIGN:
      delete newState[action.campaignId];
      return newState;
    default:
      return state;
  }
}
