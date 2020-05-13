import React from 'react';
import AudioPane from './AudioPane';

import { Connect } from "aws-amplify-react";
import { Auth, graphqlOperation } from 'aws-amplify';


import * as queries from '../graphql/queries';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';

import logo from './../logo.svg';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: '#5A9A5B',
        // backgroundImage: `url(${awslogo})`    
    },
    logo: {
        height: '30px',
        marginRight: theme.spacing(2),
    },
    awslogo: {
        width: '75px',
        float: "right",
        marginLeft: "-50px",
        marginBottom: "-100px"
    }
}));

function Main(props) {
    const isAdmin = props.groups ? props.groups.includes('Admin') : false;
    const { username, userid } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    const signout = e => {
        e.preventDefault();
        Auth.signOut({ global: true })
            .then(data => window.location.reload())
            .catch(err => console.log(err))
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleMenuClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }


    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        <MenuItem onClick={signout}>Logout</MenuItem>
                    </Menu>
                    <img
                        src={logo}
                        alt="SRT Generator"
                        className={classes.logo}
                    />
                    <Typography variant="h6" className={classes.title}>
                        SRT Generator
                    </Typography>
                    Hello {username}
                </Toolbar>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label=""
                    indicatorColor="primary"
                >
                    <Tab label="Files" {...a11yProps(0)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AudioPane userid={userid} />
            </TabPanel>
        </div>
    )
}

export default Main