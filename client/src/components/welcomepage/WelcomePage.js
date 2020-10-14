import React from 'react';

import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
      <Box className={classes.welcomeContainer} >
        <Typography variant='h1' >Welcome!</Typography>

      </Box>
    </>
  );
};

export default WelcomePage;
