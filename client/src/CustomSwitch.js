import React from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute, AuthRoute } from './components/utils/Routes';
import WelcomePage from './components/welcomepage/WelcomePage';
import CampaignsPage from './components/campaigns/CampaignsPage';
import Dashboard from './components/dashboard/Dashboard';


const CustomSwitch = ({user}) => {

  return (
    <>
      <Switch>
        <ProtectedRoute path='/users/:userId/campaigns' exact component={CampaignsPage} currentUser={user} />
        <ProtectedRoute path='/campaigns/:id' exact component={Dashboard} currentUser={user} />
        {/* <AuthRoute path='/welcome' exact component={WelcomePage} currentUser={user} /> */}
        <AuthRoute path='/' exact component={WelcomePage} currentUser={user} />
      </Switch>
    </>
  );
}

export default CustomSwitch;
