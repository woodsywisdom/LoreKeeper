import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, CardActions, CardContent, Dialog, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setTagToEdit } from '../../store/ui';
import { recategorizeTag } from '../../store/tags';

const useStyles = makeStyles({
  title: {
    padding: "16px",
  }
})


const TagEditForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tagToEdit = useSelector(state => state.ui.tagToEdit);
  const categories = useSelector(state => state.entities.categories)
  // const currentCategory = categories[tagToEdit.category_id - 1];
  // const [newName, setNewName] = useState(tagToEdit.name);
  const [newCategoryId, setNewCategoryId] = useState(tagToEdit.category_id);

  useEffect(() => {
    // setNewName(tagToEdit.name);
    setNewCategoryId(tagToEdit.category_id);
  }, [dispatch, tagToEdit]);

  // const changeName = (e) => {
  //   setNewName(e.currentTarget.value);
  // }

  const changeId = (e) => {
    setNewCategoryId(e.target.value);
  }

  const closeForm = (e) => {
    dispatch(setTagToEdit({}));
  }

  const handleSave = (e) => {
    dispatch(recategorizeTag(tagToEdit, newCategoryId));
    dispatch(setTagToEdit({}));
  }

  return (
    <>
      <Dialog open={tagToEdit.id} onClose={closeForm} >
        <Card >
          <CardContent display="flex" flexDirections="column" alignItems="center" >

            <Typography className={classes.title} variant='h5'>Edit Tag - {tagToEdit.name}</Typography>
            {/* <TextField
              defaultValue={tagToEdit.name}
              value={newName}
              onChange={changeName}
              label='New Tag Name' /> */}
            <Select
              defaultValue={tagToEdit.category_id}
              value={newCategoryId}
              onChange={changeId}
            >
              {/* <option value={tagToEdit.category_id}>{currentCategory.name}</option> */}
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>

          </CardContent>
          <CardActions>
            <Button onClick={handleSave} >Save</Button>
            <Button onClick={closeForm}>Cancel</Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
}

export default TagEditForm;
