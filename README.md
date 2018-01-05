# Alien attackers

This application is composed of a Node-Express server and a React frontend. It's currently
deployed on Heroku at https://agile-mountain-78716.herokuapp.com


# Contributing

Clone the repo with `git clone https://github.com/ryanrichholt/alien-attackers.git` and then 
install dependencies with `yarn`. This will also build the client which is required for the 
application to run properly. Below is an example:

```
git clone https://github.com/ryanrichholt/alien-attackers.git
cd alien-attackers/
yarn
```

Then, you can start the server locally:

```
yarn start
```

Now, just make sure you rebuild the client after editing anything in `client/`, or you won't see the 
changes reflected in the application frontend. You can also do this with `yarn` starting from the 
repo root or the client itself:

```
yarn build
```

## Adding/Modifying the user profiles

Inside `./models/user.js` there is a `userSchema` definition that can be used to modify the way
we store user info in the database. Do not remove the email or password fields. 

## Adding data routes

Routes can be added to the API in `./routes/api.js`. This should be kept very minimal, with 
logic/computations coded as a controller.

