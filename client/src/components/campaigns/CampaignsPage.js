import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Grid, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import CampaignCard from './CampaignCard';
import CampaignForm from './CampaignForm';
import { loadCampaigns } from '../../store/campaigns';


const useStyles = makeStyles({
  yourCampaignsHeader: {
    padding: '40px 0px',
  },
  addButton: {
    cursor: 'pointer',
    marginLeft: '40px',
  },
  campaignsContainer: {
    paddingTop: '6vh',
  }
})

const CampaignsPage = (props) => {
  const dispatch = useDispatch();
  const userId = props.match.params.userId
  const campaigns = useSelector(state => state.entities.campaigns);
  const classes = useStyles();

  const [formOpen, setFormOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setFormOpen(!formOpen);
  }

  // useEffect(() => {
  //   dispatch(loadCampaigns(userId));
  // }, [dispatch, userId]);


  return (
    <>
      <CampaignForm open={formOpen} />
      <Container className={classes.campaignsContainer}>
        <Typography className={classes.yourCampaignsHeader} variant='h4'>
          Your Campaigns
          <Button className={classes.addButton} variant='contained' onClick={handleClick}>
            <AddIcon />
          </Button>

        </Typography>
        <Grid container spacing={3} >
          {campaigns ? Object.values(campaigns).map(campaign => {
            return (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
              />
            );
          }) : <></>}
          {/* <Grid item xs={4}>
            <Card
              onClick={handleClick}
              className={classes.addCard}
            >
              <List>
                <ListItem>
                  <ListItemText>
                    <Typography variant='button'>Create New Campaign</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon><AddIcon /></ListItemIcon>
                </ListItem>
                <CardActions >
                  <Button onC
                </CardActions>
              </List>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

export default CampaignsPage;
