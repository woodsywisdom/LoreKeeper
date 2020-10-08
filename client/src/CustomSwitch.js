import React from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute, AuthRoute } from './components/utils/Routes';
import WelcomePage from './components/welcomepage/WelcomePage';
import CampaignsPage from './components/campaigns/CampaignsPage';


const CustomSwitch = ({userId}) => {

  return (
    <>
      <Switch>
        <ProtectedRoute path='/users/:userId/campaigns' exact component={CampaignsPage} currentUserId={userId} />
        <AuthRoute path='/welcome' exact component={WelcomePage} currentUserId={userId} />
        <AuthRoute path='/' exact component={WelcomePage} currentUserId={userId} />
      </Switch>
    </>
  );
}

export default CustomSwitch;
