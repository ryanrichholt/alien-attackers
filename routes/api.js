const express = require("express");
const router = express.Router();
const controllers = require("../controllers")

router.get('/', (req, res) => {
    res.json({'greeting': 'hola from api'})
});

router.get('/profile', (req, res) => {
    controllers.api.getProfile(req, res);
});

router.get('/user/:id', (req, res) => {
    // TODO Finish this route so players can view other players profiles
    res.json({ 'success': true, 'message': 'Not implemented yet' })
})

module.exports = router;