import React, { useEffect } from 'react';

import { API, graphqlOperation, Analytics } from 'aws-amplify';

import { emphasize, makeStyles, useTheme } from "@material-ui/core/styles";


import CircularProgress from '@material-ui/core/CircularProgress';

import * as queries from '../graphql/queries';

import AudioGrid from './AudioGrid';


import { useSnackbar } from 'notistack';
import FileUploader from './FileUploader';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    minHeight: 300
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  },
  progress: {
    margin: theme.spacing(2),
  },
}));



function AudioPane(props) {

  const classes = useStyles();
  const theme = useTheme();

  const { userid } = props;

  const [audios, setAudios] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleLoadAll = async () => {
    try {
      setIsLoading(true);
      const results = await API.graphql(graphqlOperation(queries.listAudios, { limit: 1000 }));
      setIsLoading(false);
      setAudios(results.data.listAudios.items);
    } catch (err) {
      console.error(err);      
    }
  };

  useEffect(() => {
    handleLoadAll()
  }, []);

  const onUploadComplete = () => {
    enqueueSnackbar('Processing uploaded file...', { variant: 'info' });    
    setTimeout(function () {
      enqueueSnackbar('File is uploaded', { variant: 'success' });
      handleLoadAll()
    }, 5000);
  }

  return (
    <div className={classes.root}>
      <div>
        <FileUploader onComplete={onUploadComplete} userid={userid} />
      </div>
      {isLoading ?
        <CircularProgress className={classes.progress} />
        : (
          audios && audios.length > 0 ?
            <AudioGrid audios={audios} userid={userid} />
            : 'No record found'
        )
      }

    </div>
  );
}

export default AudioPane;