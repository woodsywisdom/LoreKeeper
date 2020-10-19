import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './LoginForm';
import { openLogin } from '../../store/ui';


const useStyles = makeStyles(theme => ({
  welcomeContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeCard: {
    padding: '24px',
  },
  actionsBox: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

const WelcomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loginOpen = (e) => dispatch(openLogin());

  return (
    <>
      <LoginForm />
      <Box className={classes.welcomeContainer}>
        <Card className={classes.welcomeCard} variant='outlined'>
          <CardContent >
            <Typography variant='h2' gutterBottom align='center' >Welcome to LoreKeeper!</Typography>
            <Typography align='center' >LoreKeeper is a dynamic notetaking app for your Dungeons and Dragons or TTRPG game.  <br /><br />
              Intuitively create notes connected to topics (e.g. NPCs, Locations, etc.) by including hashtags in your notes, <br />
              then easily access all notes associated with those topics.  <br /><br />
              Sign up and see how LoreKeeper can make running your game a lower CR monster than you ever thought possible! </Typography>
          </CardContent>
          <Box className={classes.actionsBox} >
            <CardActions right='24px' >
              <Button onClick={loginOpen} variant='contained' color='primary' >Login / Sign Up</Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default WelcomePage;
