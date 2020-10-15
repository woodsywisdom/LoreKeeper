import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Navbar from './components/navbar/Navbar';
import { setUser } from './store/auth';
import CustomSwitch from './CustomSwitch';
import WelcomePage from './components/welcomepage/WelcomePage';

// const mahoganyTheme = createMuiTheme({
//     "palette": {
//         "common": {
//             "black":"#000",
//             "white":"#fff",
//         },
//         "background": {
//             // "paper": "rgba(76, 24, 15, 1)",
//             "paper":"rgba(67, 24, 17, 1)",
//         },
//         "primary": {
//             "light":"rgba(198, 131, 111, 1)",
//             "main":"rgba(143, 67, 43, 1)",
//             "dark":"rgba(99, 35, 15, 1)",
//             "contrastText":"#fff",
//         },
//         "secondary": {
//             "light":"rgba(244, 205, 160, 1)",
//             "main":"rgba(236, 176, 105, 1)",
//             "dark":"rgba(188, 109, 17, 1)",
//             "contrastText":"rgba(0, 0, 0, 1)",
//         },
//         "error": {
//             "light":"#e57373",
//             "main":"rgba(208, 2, 27, 1)",
//             "dark":"#d32f2f",
//             "contrastText":"#fff",
//         },
//         "text": {
//             "primary":"rgba(255, 255, 255, 1)",
//             "secondary":"rgba(0, 0, 0, 1)",
//             "disabled":"rgba(248, 231, 28, 1)",
//             "hint":"rgba(139, 87, 42, 1)",
//         }
//     }
// });

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

function App() {

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
            if (res.ok && !res.errors) {
                const user = await res.json();
                dispatch(setUser(user));
            }
            setLoading(false);
        }
        loadUser();
    }, [dispatch]);

    const currentUser = useSelector(state => state.auth)

    if (loading) {
        return <WelcomePage />
    }

    return (
        <ThemeProvider theme={darkTheme} >
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <CustomSwitch user={currentUser} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
