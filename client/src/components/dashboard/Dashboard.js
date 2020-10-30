import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Button, Card, CardActions, CardContent, Drawer, List, TextField, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import CategoryTags from './CategoryTags';
import CorkBoard from './CorkBoard';
import Help from './Help';
import TagEditForm from './TagEditForm';
import { setCategories } from '../../store/categories';
import { setTags } from '../../store/tags';
import { createNote } from '../../store/notes';
import { setCurrentCampaign, setCurrentSession, setPins } from '../../store/ui';

const useStyles = makeStyles({
  dashboardBox: {
    display: 'flex',
    height: '100vh',
    paddingTop: '6vh',
  },
  categoryList: {
    paddingTop: "64px",
  },
  drawer: {
    width: "250px",
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  corkBoard: {
    flexGrow: 1,
  },
  notePadContainer: {
    width: "100%",
    height: "225px",
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
  },
  notePad: {
    height: "209px",
    width: '100%',
    maxWidth: '600px',
    position: 'fixed',
    left: '250px',
  },
  notepadButtons: {
    // justifyContents: 'end',
  },
  noteField: {
    width: '100%',
  },
  helpCard: {
  }
});

const Dashboard = (props) => {
  const campaignId = props.match.params.id
  const dispatch = useDispatch();
  const classes = useStyles();

  const categories = useSelector(state => state.entities.categories);
  const newTagNum = categories[0] ? Object.values(categories[0]).length : 0;
  const tags = useSelector(state => state.entities.tags)
  const currentSession = useSelector(state => state.ui.currentSession);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [helpOpen, setHelpOpen] = useState(true);

  const noteChange = (e) => {
    setNewNoteContent(e.currentTarget.value);
  }

  const noteSubmit = async (e) => {
    e.preventDefault();
    const words = newNoteContent.split(' ');
    const hashtags = words.filter(word => word.startsWith('#'));
    let hashtagIds = [];
    let newHashtags = [];
    hashtags.forEach(hashtag => {
      hashtag = (hashtag.replace(/[.,/!$%^&*;:{}=`~()]/g, "")).toLowerCase();
      if (!(hashtag in tags)) {
        newHashtags.push(hashtag);
      } else {
        hashtagIds.push(tags[hashtag].id);
      }
    });
    const newNote = dispatch(createNote(newNoteContent, hashtagIds, campaignId, newHashtags));
    setNewNoteContent(`${currentSession.name} `);
    if ('errors' in newNote) {
      //add error handling
      return
    }
  }

  const helpToggle = (e) => {
    setHelpOpen(!helpOpen);
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      noteSubmit(e);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/campaigns/${campaignId}`);
      if (res.ok) {
        const data = await res.json();
        dispatch(setCategories(data.categories));
        dispatch(setTags(data.tags));
        const sessions = Object.values(data.tags).filter(tag => tag.category_id === 2);
        const lastSession = sessions[sessions.length - 1];
        dispatch(setCurrentCampaign(data.campaign));
        dispatch(setCurrentSession(lastSession));
        dispatch(setPins(data.pins));
        setNewNoteContent(`${lastSession.name} `);
      }
    }
    loadData();
  }, [dispatch, campaignId]);

  const categoryBuilder = (category) => {
    return (
      <Accordion key={category.id} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{category.name}</Typography>
          {/* { (newTagNum && category.id === 1) ? (
            <Badge badgeContent={newTagNum} color='primary'>
              <NewReleasesIcon />
            </Badge>
          ) : null } */}
        </AccordionSummary>
        <AccordionDetails>
          <CategoryTags catId={category.id} tagIds={category.tags} />
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <>
      <TagEditForm />
      <Box className={classes.dashboardBox} >
        <Drawer className={classes.drawer} variant='permanent' >
          <List className={classes.categoryList}>
            {categories ? categories.map(categoryBuilder) : <p>Loading</p>}
          </List>
        </Drawer>
        <Box className={classes.content} >
          <Box className={classes.corkBoard} >
            <CorkBoard />
          </Box>
          <Box className={classes.notePadContainer} >
            <Card className={classes.notePad}>
              <CardContent>
                {/* <Typography>The notepad will go here</Typography> */}
                <TextField
                  className={classes.noteField}
                  label='Note contents.  Use "#" at the start of any tags you want to add'
                  multiline
                  rows={4}
                  variant='outlined'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={noteChange}
                  onKeyPress={handleEnter}
                  value={newNoteContent}
                />
              </CardContent>
              <Box display='flex' justifyContent='flex-end' className={classes.notepadButtons}>
                <CardActions  >
                  <Button onClick={noteSubmit} variant='contained' color='primary' >Submit</Button>
                  <Button onClick={helpToggle} >{helpOpen ? 'Close Help' : '?'}</Button>
                </CardActions>

              </Box>
            </Card>
            {helpOpen ? <Help className={classes.helpCard} /> : <></>}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
