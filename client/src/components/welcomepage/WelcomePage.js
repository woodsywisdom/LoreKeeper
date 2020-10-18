import React from 'react';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './LoginForm';


const useStyles = makeStyles(theme => ({
  welcomeContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const WelcomePage = () => {
  const classes = useStyles();

  return (
    <>
      <LoginForm />
      <Box className={classes.welcomeContainer} >
        <Typography variant='h1' >Welcome!</Typography>

      </Box>
    </>
  );
};

export default WelcomePage;
