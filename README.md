# SRT Generator by Amazon Transcribe

This application generates SRT file by uploading a "mp3" audio file to the cloud.

The speech-to-text service behind is Amazon Transcribe

# Deployment guide:


```
amplify init
```

> Note: It is recommended to run this command from the root of your app directory

> ? Enter a name for the project (srtgenerator) `srtgenerator`

> ? Enter a name for the environment `master`

> ? Choose your default editor: `pick one one you like`

> ? Choose the type of app that you're building `javascript`

> ? What javascript framework are you using `react`

> ? Source Directory Path:  `src`

> ? Distribution Directory Path: `build`

> ? Build Command:  `npm run-script build`

> ? Start Command: `npm run-script start`

Using default provider  awscloudformation

> ? Do you want to use an AWS profile? `Yes`

> ? Please choose the profile you want to use `default`

> Adding backend environment master to AWS Amplify Console app: xxxxxxxx

> ⠇ Initializing project in the cloud...

Now your Amplify application is ready.


Validate if the folllowing command can return the result as shown:

```
amplify status
```

```
Current Environment: master

| Category | Resource name | Operation | Provider plugin |
| -------- | ------------- | --------- | --------------- |

```

----

## Add Auth

To support a multi-user

```
amplify add auth
```

```
Using service: Cognito, provided by: awscloudformation
 
 The current configured provider is Amazon Cognito. 
```

>  Do you want to use the default authentication and security configuration? `Manual configuration`

> Select the authentication/authorization services that you want to use: `User Sign-Up, Sign-In, conn
ected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and more)`

> Please provide a friendly name for your resource that will be used to label this category in the project: `press Enter to accept default`

> Please enter a name for your identity pool. `press Enter to accept default`

> Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) `No`

> Do you want to enable 3rd party authentication providers in your identity pool `No`

> Please provide a name for your user pool: `press Enter to accept default`

> Warning: you will not be able to edit these selections. 
 How do you want users to be able to sign in? `Username`

> Do you want to add User Pool Groups? `No`

> Do you want to add an admin queries API? `No`

> Multifactor authentication (MFA) user login options: `OFF`

> Email based user registration/forgot password: Enabled `(Requires per-user email entry at registration)`

> Please specify an email verification subject: (Your verification code) `press Enter to accept default`

> Please specify an email verification message: Your verification code is {####} `press Enter to accept default`

> Do you want to override the default password policy for this User Pool? `No`

> Warning: you will not be able to edit these selections.

> What attributes are required for signing up? (Press <space> to select, \<a\> to toggle all, \<i\> to invert selection) `press Enter to accept default`

> Specify the app's refresh token expiration period (in days): (30) `press Enter to accept default`

> Do you want to specify the user attributes this app can read and write? `N`

> Do you want to enable any of the following capabilities? (Press <space> to select, \<a\> to toggle all, \<i\> to invert selection) `press Enter to accept default`

> Do you want to use an OAuth flow? (Use arrow keys) `Yes`

>  What domain name prefix you want us to create for you? `press Enter to accept default`

At this stage, for local development, let's use `localhost`

> Enter your redirect signin URI: `http://localhost:3000/`

> ? Do you want to add another redirect signin URI `No`

> Enter your redirect signout URI: `http://localhost:3000/`

> ? Do you want to add another redirect signout URI `No`

> Select the OAuth flows enabled for this project. `Authorization code grant`

> Select the OAuth scopes enabled for this project. `press Enter to accept default`

> Select the social providers you want to configure for your user pool: (Press \<space\> to select, \<a\> to toggle all, \<i\> to invert selection) `press Enter to accept default`

> ? Do you want to configure Lambda Triggers for Cognito? `No`


```
amplify status
```

```
Current Environment: master

| Category | Resource name                | Operation | Provider plugin   |
| -------- | ---------------------------- | --------- | ----------------- |
| Auth     | srtgeneratorba?????????????? | Create    | awscloudformation |

```

To deploy:

```
amplify push -y
```

----

## Add API

```
amplify add api
```

> ? Please select from one of the below mentioned services: `GraphQL`

> ? Provide API name: `press Enter to accept default`

> ? Choose the default authorization type for the API `Amazon Cognito User Pool`

> Use a Cognito user pool configured as a part of this project.

> ? Do you want to configure advanced settings for the GraphQL API `Yes, I want to make some additional changes.`

> ? Configure additional auth types? `No`

> ? Configure conflict detection? `No`

> ? Do you have an annotated GraphQL schema? `Yes`

> ? Provide your schema file path: `./backend/schema.graphql`

```
amplify push -y
```

----

## Add Storage

```
amplify add storage
```

> ? Please select from one of the below mentioned services: `Content (Images, audio, video, etc.)`


> ? Please provide a friendly name for your resource that will be used to label this category in the project: `press Enter to accept default`

> ? Please provide bucket name: `press Enter to accept default`

> ? Who should have access: `Auth users only`

> ? What kind of access do you want for Authenticated users? `create/update, read`

> ? Do you want to add a Lambda Trigger for your S3 Bucket? `No`

> Successfully added resource s3???????? locally

```
amplify push -y
```







