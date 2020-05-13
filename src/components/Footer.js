import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  footer: {
    padding: 10,
    fontSize: 'small',
    color: '#FFF'
  }
});
function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="body1">
        &copy; 2020 SRT Generator        
      </Typography>
    </div>
  );
}

export default Footer;