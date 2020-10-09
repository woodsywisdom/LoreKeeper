import React from 'react';
import { useSelector } from 'react-redux';

import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tagsList: {
    width: "100%",
  }
}));

const tagBuilder = (tag) => {
  return (
    <Accordion key={tag.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography >{tag.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>

      </AccordionDetails>
    </Accordion>
  )
}

const CategoryTags = ({ catId }) => {

  const classes = useStyles();
  const catTags = useSelector(state => state.entities.tags[catId]);

  return (
    <>
      <List className={classes.tagsList}>
        {catTags ? catTags.map(tag => tagBuilder(tag)) : <p>...</p>}
      </List>
    </>
  );
}

export default CategoryTags;
