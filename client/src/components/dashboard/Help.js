import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  helpCard: {
    width: '320px',
    position: 'fixed',
    left: '860px',
  }
});

const Help = () => {
  const classes = useStyles();

  return (
    <Card className={classes.helpCard} >
      <CardContent>
        <Typography >How to use: Just start typing!  Every note automatically includes the current session's tag, but you can add existing or new tags by just adding a '#' at the beginning of its name! (Avoid puntuation like apostrophes and commas.  Hyphens are cool though)</Typography>
      </CardContent>
    </Card>
  );
}

export default Help;
