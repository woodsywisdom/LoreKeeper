import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/auth';

import { AppBar, Box, IconButton, Toolbar, Button, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
  }
});

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login('Ian', 'password'));
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <>
      <AppBar position='static' >
        <Toolbar display='flex' variant="dense" className={classes.toolbar} >
          <Box>
            <Typography variant='button'>LoreKeeper</Typography>
          </Box>
          <Box>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleLogout}>Logout</Button>
            <Button endIcon={<ExpandMoreIcon />}>Campaigns</Button>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
