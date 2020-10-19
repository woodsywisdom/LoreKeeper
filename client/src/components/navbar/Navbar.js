import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Box, Toolbar, Button, Typography, Menu, MenuItem, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import AccountCircle from '@material-ui/icons/AccountCircle';

import { logout } from '../../store/auth';
import { openLogin } from '../../store/ui';
import { loadCampaigns } from '../../store/campaigns';


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
  logoButton: {
    cursor: 'pointer',
  }
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentCampaign = useSelector(state => state.ui.currentCampaign);
  const campaigns = useSelector(state => state.entities.campaigns)
  const currentUser = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(loadCampaigns(currentUser.id));
  }, [dispatch, currentUser]);

  const logoClick = e => window.location = '/';

  const handleLogin = (e) => dispatch(openLogin());

  const handleLogout = (e) => dispatch(logout());

  const openCampaigns = (e) => setAnchorEl(e.currentTarget);

  const closeCampaigns = (e) => setAnchorEl(null);

  const campaignClick = (e) => window.location = `/campaigns/${e.currentTarget.value}`;

  return (
    <>
      <AppBar className={classes.appBar} position='fixed' >
        <Toolbar display='flex' variant="dense" className={classes.toolbar} >
          <Box className={classes.logoButton} onClick={logoClick} >
            <Typography variant='button'>LoreKeeper</Typography>
          </Box>
          <Box>
            {currentUser.id ? (
              <>
                <Button onClick={openCampaigns} endIcon={<ExpandMoreIcon />}>
                  {currentCampaign.title ? currentCampaign.title
                    : <Typography variant='button'>Select a Campaign!</Typography>}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  onClose={closeCampaigns}
                  open={!!anchorEl}
                >
                  {campaigns ? Object.values(campaigns).map((campaign) => (
                    <MenuItem key={campaign.id} value={campaign.id} onClick={campaignClick} >
                      {campaign.title}
                    </MenuItem>
                  )) : null}
                </Menu>
              </>) : null}
          </Box>
          <Box>
            {currentUser.is_authenticated ?
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
