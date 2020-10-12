import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TagNotes from './TagNotes';


const useStyles = makeStyles(theme => ({

}));

const CorkBoard = () => {
  const classes = useStyles();
  const pinnedTags = useSelector(state => state.ui.pinnedTags);

  return (
    <>
      <Box display='flex'>
        {pinnedTags.map(tag => <TagNotes tag={tag} />)}
      </Box>
    </>
  );
}

export default CorkBoard;
