import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newCampaign } from '../../store/campaigns';

import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';


const CampaignForm = ({ open }) => {

  const dispatch = useDispatch();

  const currentUserId = useSelector(state => state.auth.id);
  const [formOpen, setFormOpen] = useState(open);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setFormOpen(open);
  }, [dispatch, open]);

  const handleClick = (e) => {
    e.preventDefault();
    setFormOpen(!formOpen);
  }

  const changeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const changeDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newCampaign(title, description, currentUserId));
    setFormOpen(false);
  }

  return (
    <>
      <Dialog
        open={formOpen}
        onClose={handleClick}
      >
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
            onKeyPress={handleEnter}
          />
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">Add Campaign</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CampaignForm;
