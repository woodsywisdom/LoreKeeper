// import Cookies from 'js-cookie';

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

export default function campaignReducer(state=[], action) {
  const newState = Object.assign({}, state);
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
