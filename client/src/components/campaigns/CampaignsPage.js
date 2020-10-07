import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import CampaignCard from './CampaignCard';

const CampaignsPage = () => {

  const campaigns = useSelector(state => state.campaigns);

  return (
    <>
      <Container>
        <Typography variant='h4'>Your Campaigns</Typography>
        <Grid container>
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
        </Grid>
      </Container>
    </>
  );
}

export default CampaignsPage;
