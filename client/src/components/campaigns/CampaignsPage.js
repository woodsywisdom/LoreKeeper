import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container, Grid, Card, Typography, List, ListItem, ListItemText, ListItemIcon, Dialog, DialogTitle } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import CampaignCard from './CampaignCard';
import CampaignForm from './CampaignForm';


const useStyles = makeStyles({
  yourCampaignsHeader: {
    padding: '40px 0px',
  },
  addCard: {
    cursor: 'pointer',
    height: '180px',
  }
})

const CampaignsPage = () => {

  const campaigns = useSelector(state => state.campaigns);
  const classes = useStyles();

  const [formOpen, setFormOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setFormOpen(!formOpen);
  }

  return (
    <>
      <Dialog
        open={formOpen}
        onClose={handleClick}
      >
        <CampaignForm />
      </Dialog>
      <Container>
        <Typography className={classes.yourCampaignsHeader} variant='h4'>Your Campaigns</Typography>
        <Grid container spacing={3} >
          {campaigns.map(campaign => {
            return (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                title={campaign.title}
                description={campaign.description}
              />
            );
          })}
          <Grid item xs={4}>
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
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CampaignsPage;
