import React, { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Storage } from 'aws-amplify';


import { red } from '@material-ui/core/colors';



import * as mutations from './../graphql/mutations';
import * as queries from '../graphql/queries';


import awsmobile from '../aws-exports';

// const env = awsmobile.aws_content_delivery_bucket.match(/.*-(\w+)/)[1];


function AudioCard(props) {
  const { audio, userid } = props;
  const [cardVisible, setCardVisible] = React.useState(true);
  const [srtLink, setSrtLink] = React.useState('');

  let loader;
  const useCardStyles = makeStyles(theme => ({
    card: {
      width: 290,
      minHeight: 150,
      marginRight: 5,
      marginLeft: 5,
      marginTop: 10,
      marginBottom: 5,
      padding: 5,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      cursor: 'pointer'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      // transition: theme.transitions.create('transform', {
      //   duration: theme.transitions.duration.shortest,
      // }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    chip: {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    dialogImgContainer: {
      textAlign: "center"
    },
    dialogImg: {
      maxWidth: "100%"
    }
  }));

  const classes = useCardStyles();

  const deleteAudio = async (audio) => {
    const input = {
      id: audio.id
    }

    try {
      await API.graphql(graphqlOperation(mutations.deleteAudio, { input }));
      setCardVisible(false);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = (audio, event) => {
    if (window.confirm('Are you sure to delete this audio')) {
      deleteAudio(audio);
    }
  }

  useEffect(() => {
    const checkSRTLink = () => {      
      loader = setInterval(async () => {        
        const input = {
          id: audio.id
        }
        const record = await API.graphql(graphqlOperation(queries.getAudio, input));
        if (record.data.getAudio.srtfilekey !== null ) {          
          clearInterval(loader);  
          const linkURL = await Storage.get(record.data.getAudio.srtfilekey, { identityId: userid, level: 'protected' });
          setSrtLink(linkURL);
        }
      }, 5000);
    };
    checkSRTLink();
  }, []);

  return (
    <>
      {cardVisible &&
        <div key={audio.id}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="div">
                {audio.s3key.replace(/^.*[\\\/]/, '')}
                {srtLink !== '' ?
                <Link href={srtLink} color="inherit">
                  Download SRT file
                </Link>
                : 
                <CircularProgress />
                }
              </Typography>

            </CardContent>
          </Card>
        </div>

      }
    </>
  );
}
export default AudioCard;

