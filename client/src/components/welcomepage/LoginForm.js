import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, ButtonGroup, Dialog, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';

import { login } from '../../store/auth';
import { closeLogin } from '../../store/ui';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px',
  },
  loginContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0px',
  },
  signUpContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0px',
  },
  inputField: {
    margin: '8px 20px',
  }
})


const LoginForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginOpen = useSelector(state => state.ui.loginOpen);
  const [loginErrors, setLoginErrors] = useState([]);
  const [signUpErrors, setSignUpErrors] = useState([]);
  const [username1, setUsername1] = useState('');
  const [password1, setPassword1] = useState('');
  const [username2, setUsername2] = useState('');
  const [password2, setPassword2] = useState('');
  const [confirm, setConfirm] = useState('');

  const changeUsername1 = (e) => {
    setUsername1(e.target.value);
  }

  const changePassword1 = (e) => {
    setPassword1(e.target.value);
  }

  const changeUsername2 = (e) => {
    setUsername2(e.target.value);
  }

  const changePassword2 = (e) => {
    setPassword2(e.target.value);
  }

  const changeConfirm = (e) => {
    setConfirm(e.currentTarget.value)
    // (password2 !== confirm) ? setPasswordMatch(false) : setPasswordMatch(true);
  }

  const demoLogin = (e) => {
    dispatch(login('Ian', 'password'));
  }

  const submitLogin = (e) => {
    const errors = dispatch(login(username1, password1));
    if (errors) {
      setLoginErrors(errors);
    }
  }

  const handleClose = (e) => {
    dispatch(closeLogin());
  }

  return (
    <>
      <Dialog open={loginOpen} onClose={handleClose}>
        <Box className={classes.formContainer} >
          <Box className={classes.loginContainer} >
            <Typography variant='h5'>Log In</Typography>
            <TextField
              autoFocus
              className={classes.inputField}
              onChange={changeUsername1}
              placeholder='Username'
              required
              value={username1}
              variant='outlined'
              />
            <TextField
              className={classes.inputField}
              onChange={changePassword1}
              placeholder='Password'
              required
              type='password'
              value={password1}
              variant='outlined'
            />
            {loginErrors ? <List >
              {loginErrors.map(error => (
                <ListItem>
                  <ListItemText>{error.message}</ListItemText>
                </ListItem>
              ))}
            </List> : null}
            <ButtonGroup>
              <Button onClick={submitLogin} variant='contained' color='primary' >Login</Button>
              <Button onClick={demoLogin} variant='contained' >Demo</Button>
            </ButtonGroup>
          </Box>
          <Box className={classes.signUpContainer} >
            <Typography variant='h5'>Sign Up</Typography>
            <TextField
              className={classes.inputField}
              onChange={changeUsername2}
              placeholder='Username'
              required
              value={username2}
              variant='outlined'
              />
            <TextField
              className={classes.inputField}
              onChange={changePassword2}
              placeholder='Password'
              required
              type='password'
              value={password2}
              variant='outlined'
              />
            <TextField
              className={classes.inputField}
              error={password2 !== confirm}
              onChange={changeConfirm}
              placeholder='Confirm Password'
              required
              type='password'
              value={confirm}
              variant='outlined'
              />
            <Button onClick={submitLogin} variant='contained' >Sign Up</Button>
          </Box>
        </Box>

      </Dialog>
    </>
  );
}

export default LoginForm;
