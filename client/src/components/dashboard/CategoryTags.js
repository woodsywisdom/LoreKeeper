import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, IconButton, List, ListItem, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { pinTag } from '../../store/ui';


const useStyles = makeStyles((theme) => ({
  tagsList: {
    width: "100%",
  }
}));

const TagAccordion = ({ tag }) => {

  const dispatch = useDispatch();

  const handlePin = () => {
    dispatch(pinTag(tag));
    return
  }

  const handleEdit = () => {
    return
  }

  const handleDelete = () => {
    return
  }

  return (
    <Accordion key={tag.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography >{tag.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>

      </AccordionDetails>
      <AccordionActions>
        <IconButton onClick={handlePin} >
          <ListAltIcon />
        </IconButton>
        <IconButton onClick={handleEdit} >
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} >
          <DeleteIcon />
        </IconButton>
      </AccordionActions>
    </Accordion>
  )
}

const CategoryTags = ({ catId, tagIds }) => {

  const classes = useStyles();
  const catTags = useSelector(state => Object.values(state.entities.tags).filter(tag => tag.category_id === catId));

  return (
    <>
      <List className={classes.tagsList}>
        {catTags ? catTags.map(tag => <TagAccordion tag={tag} />) : <p>...</p>}
      </List>
    </>
  );
}

export default CategoryTags;
