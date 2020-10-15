import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

import { Box, Card, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getNotes } from '../../store/notes';


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
  const notes = useSelector(state => state.entities.notes[tag.name]);
  // const [notes, setNotes] = useState([]);
  const [height, setHeight] = useState(100);

  const recalcSize = () => {
    const newHeight = window.innerHeight - 320;
    setHeight(newHeight)
  };

  useEffect(() => {
    dispatch(getNotes(tag));

    recalcSize();
    window.addEventListener('resize', recalcSize);
  }, [dispatch]);


  return (
    <>
      <Box className={classes.pinnedTag} display='flex'>
        <Typography variant='h5'>{tag.name}</Typography>
        <FixedSizeList
          height={height}
          width={360}
          itemSize={80}
          itemCount={notes ? notes.length : 0}
          itemData={notes}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </>
  );
}

export default TagNotes;
