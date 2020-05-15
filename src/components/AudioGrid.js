import React from 'react'
import { Connect } from "aws-amplify-react";
import { graphqlOperation } from 'aws-amplify';

import { makeStyles } from "@material-ui/core/styles";
import GridList from '@material-ui/core/GridList';

import AudioCard from './AudioCard'

import * as mutations from '../graphql/mutations';


function AudioGrid(props) {
    const { audios, userid } = props;

    const useGridStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 'auto',
            height: 'auto',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }));
    const classes = useGridStyles();


    return (
        <div className={classes.root}>
            <GridList className={classes.gridList}>
                {
                    audios.map(audio => (
                        <AudioCard audio={audio} key={audio.id} userid={userid} />
                    ))
                }
            </GridList>
        </div>
    );
}

export default AudioGrid;