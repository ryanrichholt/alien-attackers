# Alien attackers

This application is composed of a Node-Express server and a React frontend. It's currently
deployed on Heroku at https://agile-mountain-78716.herokuapp.com


# Contributing

Clone the repo with `git clone https://github.com/ryanrichholt/alien-attackers.git` and then 
install dependencies with `yarn`. This will also build the client which is required for the 
application to run properly. Below is an example:

```shell
[~]$ git clone https://github.com/ryanrichholt/alien-attackers.git
Cloning into 'alien-attackers'...
remote: Counting objects: 114, done.
remote: Compressing objects: 100% (90/90), done.
remote: Total 114 (delta 15), reused 104 (delta 10), pack-reused 0
Receiving objects: 100% (114/114), 42.39 MiB | 1.50 MiB/s, done.
Resolving deltas: 100% (15/15), done.
[~]$ cd alien-attackers/
[~/alien-attackers]$ yarn
yarn install v1.3.2
info No lockfile found.
[1/4] 🔍  Resolving packages...
...
✨  Done in 21.18s.
```

Then, you can start the server locally with `yarn start`:

```shell
[~/alien-attackers]$ yarn start
Serving static files from: /Users/rrichholt/Dropbox/School/UA_Bootcamp/alien-attackers/client/build
(node:96158) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
🌎  Server now listening on PORT 8080!
Mongoose connected to localhost:27017
```

Now, just make sure you rebuild the client after editing anything in `client/`, or you won't see the 
changes reflected in the application frontend. You can also do this with `yarn` starting from the 
repo root or the client itself:

```shell
[~/alien-attackers]$ yarn build
yarn run v1.3.2
$ cd client/ && yarn build
$ react-scripts build
Creating an optimized production build...
...
✨  Done in 7.44s.
```

## Adding/Modifying the user profiles

Inside `./models/user.js` there is a `userSchema` definition that can be used to modify the way
we store user info in the database. Do not remove the email or password fields. 

## Adding data routes

Routes can be added to the API in `./routes/api.js`. This should be kept very minimal, with 
logic/computations coded as a controller.

