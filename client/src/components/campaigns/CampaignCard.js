import React from 'react';

import { Grid, Card, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  campaignCard: {
    cursor: 'pointer',
    height: '180px',

  },
})

const CampaignCard = (props) => {

  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    window.location = `/campaigns/${e.currentTarget.id}`
  }

  return (
    <>
      <Grid item xs={4}>
        <Card
          onClick={handleClick}
          id={props.id}
          className={classes.campaignCard}
        >
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant='button'>{props.title}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant='caption'>{props.description}</Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Card>
      </Grid>

    </>
  );
}

export default CampaignCard;
