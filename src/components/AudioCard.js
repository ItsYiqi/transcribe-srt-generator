import React from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { red } from '@material-ui/core/colors';



import * as mutations from './../graphql/mutations';


import awsmobile from '../aws-exports';

// const env = awsmobile.aws_content_delivery_bucket.match(/.*-(\w+)/)[1];


function AudioCard(props) {
  const { audio } = props;
  const [cardVisible, setCardVisible] = React.useState(true);


  const useCardStyles = makeStyles(theme => ({
    card: {
      width: 290,
      minHeight: 350,
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


  return (
    <>
      {cardVisible &&
        <div key={audio.id}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="div">
                {audio.id}
              </Typography>
                
            </CardContent>
          </Card>         
        </div>

      }
    </>
  );
}
export default AudioCard;

