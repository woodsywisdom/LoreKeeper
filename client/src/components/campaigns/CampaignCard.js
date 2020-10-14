import React from 'react';
import { useDispatch } from 'react-redux';

import { Grid, Button, Card, Typography, List, ListItem, ListItemText, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteCampaign } from '../../store/campaigns';


const useStyles = makeStyles({
  campaignCard: {
    cursor: 'pointer',
    height: '180px',

  },
})

const CampaignCard = ({campaign}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id, title, description } = campaign;

  const handleClick = (e) => {
    e.preventDefault();
    window.location = `/campaigns/${e.currentTarget.id}`;
  }
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteCampaign(id));
  }

  return (
    <>
      <Grid item xs={4}>
        <Card
          onClick={handleClick}
          id={id}
          className={classes.campaignCard}
        >
          <List>
            <ListItem>
              <ListItemText>
                <Typography variant='button'>{title}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant='caption'>{description}</Typography>
              </ListItemText>
            </ListItem>
          </List>
          <CardActions className={classes.cardActions}>
            <Button onClick={handleDelete}>
              <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
      </Grid>

    </>
  );
}

export default CampaignCard;
