# TheGame backend server

This server handles the data and authentication routes. It is set up to deliver a react app 
that exists at `../thegame_frontend/build/index.html` with static files at 
`../thegame_frontend/build/static/` This can be changed inside `config.js`. The database 
credentials and session secret are stored in `secrets.js` DO NOT COMMIT this file to the repo.

# Adding/Modifying the user profiles

Inside `./models/user.js` there is a `userSchema` definition that can be used to modify the way
we store user info in the database. Do not remove the email or password fields. 

# Adding data routes

Routes can be added to the API in `./routes/api.js`. This should be kept very minimal, with 
logic/computations coded as a controller.

