import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Drawer, Grid, List, ListItem, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import CategoryTags from './CategoryTags';
import { setCategories } from '../../store/categories';
import { setTags } from '../../store/tags';

const useStyles = makeStyles({
  dashboardBox: {
    display: 'flex',
    paddingTop: "50px",
  },
  categoryList: {
    paddingTop: "50px",
  },
  drawer: {
    width: "250px",
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
  },
  corkBoard: {
    height: "70vh",

  },
  notePad: {
    width: "100%",
    height: "24vh",
  },
});

const Dashboard = (props) => {
  const campaignId = props.match.params.id
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/campaigns/${campaignId}`);
      if (res.ok) {
        const data = await res.json();
        dispatch(setCategories(data.categories));
        dispatch(setTags(data.tags));
      }
    }
    loadData();
  }, [dispatch]);

  const categoryBuilder = (category) => {
    return (
      <Accordion key={category.id} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{category.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CategoryTags catId={category.id} />
        </AccordionDetails>
      </Accordion>
    )
  }

  const categories = useSelector(state => state.entities.categories);

  return (
    <Box className={classes.dashboardBox} >
      <Drawer className={classes.drawer} variant='permanent' >
        <List className={classes.categoryList}>
          {categories ? categories.map(categoryBuilder) : <p>Loading</p>}
        </List>
      </Drawer>
      <Box className={classes.content} >
          <Box className={classes.corkBoard} >
            <h1>Campaign {campaignId} Dashboard</h1>

          </Box>
          <Box className={classes.notePad} >
            <Card >
              <Typography>The notepad will go here</Typography>
            </Card>
          </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
