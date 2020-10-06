import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';


import UserList from './components/UsersList';


function App() {
    console.log("____Rendering app_____")
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <nav>
                    <ul>
                        <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                        <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/users">
                        <UserList />
                    </Route>

                    <Route path="/">
                        <h1>My Home Page</h1>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
