const express = require("express");
const router = express.Router();
const controllers = require("../controllers")

router.get('/', (req, res) => {
    res.json({'greeting': 'hola from api'});
});

router.get('/profile', (req, res) => {
    controllers.api.getProfile(req, res);
});

router.post('/profile/score', (req, res) =>{
    controllers.api.addScore(req, res);
})

router.get('/user/:id', (req, res) => {
    // TODO Finish this route so players can view other players profiles
    res.json({ 'success': true, 'message': 'Not implemented yet' });
})

router.get('/leaderboard', (req, res) => {
    controllers.api.getLeaders(req, res);
})



module.exports = router;