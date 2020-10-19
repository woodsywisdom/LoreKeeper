import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, ButtonGroup, Dialog, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';

import { login, signUp } from '../../store/auth';
import { closeLogin } from '../../store/ui';
import { clearLoginErrors, clearSignUpErrors } from '../../store/errors';

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
  },
  errorList: {
    color: 'red',
  }
})


const LoginForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginOpen = useSelector(state => state.ui.loginOpen);
  const errors = useSelector(state => state.errors);
  const [username1, setUsername1] = useState('');
  const [password1, setPassword1] = useState('');
  const [username2, setUsername2] = useState('');
  const [password2, setPassword2] = useState('');
  const [confirm, setConfirm] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearLoginErrors());
      dispatch(clearSignUpErrors());
    }
  }, [dispatch]);

  const changeUsername1 = (e) => setUsername1(e.target.value);

  const changePassword1 = (e) => setPassword1(e.target.value);

  const changeUsername2 = (e) => setUsername2(e.target.value);

  const changePassword2 = (e) => setPassword2(e.target.value);

  const changeConfirm = (e) => setConfirm(e.currentTarget.value);

  const demoLogin = (e) => dispatch(login('Ian', 'password'));

  const submitLogin = (e) => dispatch(login(username1, password1));

  const submitSignUp = (e) => dispatch(signUp(username2, password2, confirm));

  const handleClose = (e) => {
    setUsername1('');
    setPassword1('');
    setUsername2('');
    setPassword2('');
    setConfirm('');
    dispatch(clearLoginErrors());
    dispatch(clearSignUpErrors());
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
            {errors.login ? <List className={classes.errorList} >
              {errors.login.map(error => (
                <ListItem>
                  <ListItemText color='secondary'>{error}</ListItemText>
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
            {errors.signUp ? <List className={classes.errorList} >
              {errors.signUp.map(error => (
                <ListItem>
                  <ListItemText color='secondary'>{error}</ListItemText>
                </ListItem>
              ))}
            </List> : null}
            <Button onClick={submitSignUp} variant='contained' color='primary' >Sign Up</Button>
          </Box>
        </Box>

      </Dialog>
    </>
  );
}

export default LoginForm;
