import React from 'react';

import { Grid, Card, Typography } from '@material-ui/core';


const CampaignCard = (props) => {

  const handleClick = (e) => {
    e.preventDefault();
    window.location = `/campaigns/${e.target.id}`
  }

  return (
    <>
      <Grid item xs={4}>
        <Card onClick={handleClick} id={props.id}>
          <Typography variant='button'>{props.title}</Typography>
          <Typography variant='caption'>{props.description}</Typography>
        </Card>
      </Grid>

    </>
  );
}

export default CampaignCard;
