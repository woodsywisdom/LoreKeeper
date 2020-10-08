import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newCampaign } from '../../store/campaigns';

import { TextField, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';


const CampaignForm = () => {

  const dispatch = useDispatch();

  const currentUserId = useSelector(state => state.auth.id);
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  const changeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const changeDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newCampaign(title, description, currentUserId));
  }

  return (
    <>
      <DialogTitle>Create a new Campaign</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='title'
            lable="Title"
            placeholder="The title of your campaign (<50 characters)"
            fullWidth
            onChange={changeTitle}
          />
          <TextField
            id='Description'
            lable="Description"
            placeholder="A brief description of your campaign"
            fullWidth
            multiline
            onChange={changeDescription}
          />
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">Add Campaign</Button>
          </DialogActions>
        </DialogContent>
    </>
  );
}

export default CampaignForm;
