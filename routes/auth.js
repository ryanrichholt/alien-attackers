const express = require("express");
const router = express.Router();
const controllers = require("../controllers")

router.post('/login', controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/register", controllers.auth.register);

router.get('/', (req, res) => res.send('Hello from auth!'));

module.exports = router;