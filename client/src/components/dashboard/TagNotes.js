import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

import { Box, IconButton, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { getNotes } from '../../store/notes';
import { unpinTag } from '../../store/ui';


const useStyles = makeStyles(theme => ({
  notecard: {
    width: '250px',
    paddingTop: '2px',
  },
  pinnedTag: {
    flexDirection: "column",
    alignItems: "center",
    border: "solid 2px grey",
    borderRadius: '5px',
    marginTop: '16px',
    marginRight: '12px',
  },
  title: {
    color: "grey",
    textDecoration: 'underline',
  },
  closeButton: {

  }
}));



const renderRow = (props) => {
  const { index, style, data } = props;
  const note = data[index];

  return (
    <>
    <ListItem style={style} key={index} divider >
      <ListItemText primary={note.content} />
    </ListItem>
    </>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};



const TagNotes = ({ tag, position }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector(state => state.entities.notes[tag.name]);
  // const [notes, setNotes] = useState([]);
  const [height, setHeight] = useState(100);

  const recalcSize = () => {
    const newHeight = window.innerHeight - 350;
    setHeight(newHeight)
  };

  useEffect(() => {
    dispatch(getNotes(tag));

    recalcSize();
    window.addEventListener('resize', recalcSize);
  }, [dispatch, tag]);

  const unPin = (e) => dispatch(unpinTag(position));

  return (
    <>
      <Box className={classes.pinnedTag} display='flex'>
        <Typography
          className={classes.title}
          variant='h5'
        >
          {tag.name}
          <IconButton className={classes.closeButton} onClick={unPin} >
            <CloseIcon />
          </IconButton>
        </Typography>
        <FixedSizeList
          height={height}
          width={360}
          itemSize={80}
          itemCount={notes ? notes.length : 0}
          itemData={notes}
          border
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </>
  );
}

export default TagNotes;
