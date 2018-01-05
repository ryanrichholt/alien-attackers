# Alien attackers

This application is composed of a Node-Express server and a React frontend. It's currently
deployed on Heroku at https://agile-mountain-78716.herokuapp.com


# Contributing

## Adding/Modifying the user profiles

Inside `./models/user.js` there is a `userSchema` definition that can be used to modify the way
we store user info in the database. Do not remove the email or password fields. 

## Adding data routes

Routes can be added to the API in `./routes/api.js`. This should be kept very minimal, with 
logic/computations coded as a controller.

