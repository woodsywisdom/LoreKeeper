import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

import { Box, Card, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  notecard: {
    width: '250px',
    paddingTop: '2px',
  },
  pinnedTag: {
    flexDirection: "column",
    alignItems: "center",
  },
}));



const renderRow = (props) => {
  const { index, style, data } = props;
  const note = data[index];

  return (
    <ListItem style={style} key={index}>
      <ListItemText primary={note.content} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

const TagNotes = ({ tag }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const res = await fetch(`/api/notes/${tag.id}/`);
      const { savedNotes } = await res.json();
      if (res.ok) {
        setNotes(savedNotes);
      }
    }
    loadNotes();
  }, [dispatch]);

  return (
    <>
      <Box className={classes.pinnedTag} display='flex'>
        <Typography variant='h5'>{tag.name}</Typography>
        <FixedSizeList
          height={400}
          width={360}
          itemSize={70}
          itemCount={notes.length}
          itemData={notes}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </>
  );
}

export default TagNotes;
