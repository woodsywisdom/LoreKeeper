import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProtectedRoute, AuthRoute } from './components/utils/Routes';
import CampaignsPage from './components/campaigns/CampaignsPage';

import { CssBaseline } from '@material-ui/core';
import Navbar from './components/navbar/Navbar';
import WelcomePage from './components/welcomepage/WelcomePage';
import { setUser } from './store/auth';
import { setCampaigns } from './store/campaigns';


function App() {
    console.log("____Rendering app_____");

    const dispatch = useDispatch();

    useEffect(() => {
        const setCSRF = async () => {
            const res = await fetch('/api/session/csrf/');
            if (res.ok) {
                return;
            }
        }
        setCSRF();
    }, []);

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch('/api/session/current-user/');
            if (res.ok) {
                const user = await res.json()
                const campaigns = user.campaigns;
                dispatch(setCampaigns(campaigns));
                delete user.campaigns;
                dispatch(setUser(user));
            }
        }
        loadUser();
    }, []);

    const currentUserId = useSelector(state => state.auth.id)
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <ProtectedRoute path='/users/:userId/campaigns' exact component={CampaignsPage} currentUserId={currentUserId} />
                    <AuthRoute path='/welcome' exact component={WelcomePage} currentUserId={currentUserId} />
                    <AuthRoute path='/' exact component={WelcomePage} currentUserId={currentUserId} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
