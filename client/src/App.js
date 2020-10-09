import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Navbar from './components/navbar/Navbar';
import { setUser } from './store/auth';
import { setCampaigns } from './store/campaigns';
import CustomSwitch from './CustomSwitch';
import WelcomePage from './components/welcomepage/WelcomePage';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });


function App() {
    console.log("____Rendering app_____");

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setCSRF = async () => {
            const res = await fetch('/api/session/csrf/');
            if (res.ok) {
                return;
            }
        }
        setCSRF();
    }, [dispatch]);

    useEffect(() => {
        const loadUser = async () => {
            const res = await fetch('/api/session/current-user/');
            if (res.ok) {
                const user = await res.json();
                const campaigns = user.campaigns;
                dispatch(setCampaigns(campaigns));
                delete user.campaigns;
                dispatch(setUser(user));
                setLoading(false);
            }
        }
        loadUser();
    }, [dispatch]);

    const currentUserId = useSelector(state => state.auth.id)

    if (loading) {
        return <WelcomePage />
    }

    return (
        <ThemeProvider theme={darkTheme} >
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <CustomSwitch userId={currentUserId} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
