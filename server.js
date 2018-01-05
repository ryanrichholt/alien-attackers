const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const { Strategy } = require("passport-local");
const mongoose = require("mongoose");
const connectMongo = require("connect-mongo");
const models = require("./models");
const routes = require("./routes");
const controllers = require("./controllers")
const PORT = process.env.PORT || 8080;
const app = express();

const User = require("./models/user")

// Configure express
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

const secrets = {
  db: process.env.MONGODB_URI || "mongodb://localhost/thegamedb",
  sessionSecret: 'secret'
}

// Database configuration with mongoose
const db = mongoose.connection;

mongoose.connect(secrets.db, (err, res) => {
  if (err){
    console.log('Error connecting to mongo')
  } else {
    console.log(`Mongoose connected to ${db.host}:${db.port}`)  
  }
});

// Configure passport for local auth
const local = new Strategy({
    usernameField: "email",
    passwordField: "password"
  }, (email, password, done) => {  
  models.User.findOne({email}, (err, user) => {
    if(!user) return done(null, false, { message: `Email ${email} not found` })
    user.comparePassword(password, (err, isMatch) => {
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: "Invalid email or password" })
      }
    })
  })
})

// Configure Passport authenticated session persistence.

// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
const MongoStore = connectMongo(session)

const sess = {
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    proxy: false,
    name: "sessionId",
    cookie: {
      httpOnly: true,
      secure: false
    },
    store: new MongoStore({
      url: secrets.db,
      autoReconnect: true
    })
  }

app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {    
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {      
    done(err, user)
  })
})

passport.use(local)

// Configure the routes
app.use('/auth', routes.auth);
app.use('/api', routes.api);

console.log("Serving static files from: " + path.join(__dirname,"client/build"))
app.use(express.static(path.join(__dirname,"client/build")));

app.get("*", function(req, res) {
  console.log(req.url)
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Start the server
app.listen(PORT, function() {
  console.log(`🌎  Server now listening on PORT ${PORT}!`);
});
