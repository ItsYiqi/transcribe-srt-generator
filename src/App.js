import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

import Amplify, { Auth, Hub } from 'aws-amplify';
import awsmobile from './aws-exports';
// import { withAuthenticator } from 'aws-amplify-react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact, withAuthenticator, withOAuth } from 'aws-amplify-react';
// import { withOAuth } from "aws-amplify-react";

import AWSAppSyncClient from 'aws-appsync';

// import { Rehydrated } from 'aws-appsync-react';

import { ApolloProvider } from 'react-apollo';
import Main from './components/Main';
import Footer from './components/Footer'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';


import { SnackbarProvider } from 'notistack';

// import headerImage from './images/header-image.png';
// import bg from './images/bg.png';

Amplify.configure(awsmobile);
var production = true;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  production = false;
}


const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});

function App() {
  const [state, setState] = React.useState({ session: null });
  const [authenticated, setAuthenticated] = React.useState(false);
  
  useEffect(() => {
    async function fetchSession() {
      try {
        const session = await Auth.currentSession();
        setState({ session });
        setAuthenticated(true);        
      } catch (err) {
        if (err === 'No current user') {
          setTimeout(() => {
            if (!authenticated) {
              Auth.federatedSignIn();
            }
          }, 2000);
        }
      };
    }

    fetchSession();

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":          
          setState({ session: data.signInUserSession });
          window.location.reload();
          break;
        case "signOut":          
          this.setState({ session: null });
          break;
        case "customOAuthState":
          this.setState({ customState: data });
      }
    });
  }, []);

  const userInfo = () => {
    const session = state.session;
    if (!session) {
      return {};
    }
    const payload = session.idToken.payload;
    return { username: payload['cognito:username'], userid: payload['sub'], groups: payload['cognito:groups'] };
  }

  return (
    authenticated ?
      <ApolloProvider client={client}>
        <SnackbarProvider maxSnack={3}>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
              <Typography component="div" style={{ backgroundColor: '#cfe8fc' }}>
                <Main {...userInfo()} />
              </Typography>
            </Container>
            <Container maxWidth="xl">
              <Typography component="div" style={{ backgroundColor: '#5A9A5B' }}>
                <Footer />
              </Typography>
            </Container>
          </React.Fragment>
        </SnackbarProvider>
      </ApolloProvider>
      : <LinearProgress />
  );

}

export default withOAuth(App);
