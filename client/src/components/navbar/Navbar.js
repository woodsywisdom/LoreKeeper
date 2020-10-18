import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Box, Toolbar, Button, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import AccountCircle from '@material-ui/icons/AccountCircle';

import { login, logout } from '../../store/auth';
import { openLogin, closeLogin } from '../../store/ui';


const useStyles = makeStyles(theme => ({
  toolbar: {
    height: "6vh",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  appBar: {
    height: "6vh",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentCampaign = useSelector(state => state.ui.currentCampaign);
  const currentUser = useSelector(state => state.auth);

  const logoClick = e => {
    e.preventDefault();
    window.location = '/'
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(openLogin());
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <>
      <AppBar className={classes.appBar} position='fixed' >
        <Toolbar display='flex' variant="dense" className={classes.toolbar} >
          <Box onClick={logoClick} >
            <Typography variant='button'>LoreKeeper</Typography>
          </Box>
          <Box>
            <Button endIcon={<ExpandMoreIcon />}>
              { currentCampaign.title ? currentCampaign.title
                : <Typography variant='button'>Select a Campaign!</Typography>}
            </Button>
          </Box>
          <Box>
            { currentUser.is_authenticated ?
              <Button onClick={handleLogout}>Logout</Button>
              : <Button onClick={handleLogin}>Login</Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
