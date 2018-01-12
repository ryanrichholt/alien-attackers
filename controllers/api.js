const mongoose = require("mongoose");
const passport = require("passport");
const { User, Score } = require("../models");


module.exports.getProfile = function(req, res){
    // req.user is the user identity added by passport if the request comes 
    // from an authenticated session
	if(req.user){
		res.json({success: true, user: req.user})	
	} else {
		res.status(401).json({ success: false })
	}
}


module.exports.getLeaders = function(req, res){
    Score.find()
    .sort({ score: -1 })
    .limit(10)
    .then(results => {
        res.json(results)
    });
}


module.exports.addScore = function(req, res){
    let score = 0
    if(req.user && req.body.score){
        score = parseInt(req.body.score)

        Score
        .create({ pilot: req.user.pilotName, score: score })
        .then(
            User
           .findOneAndUpdate(
                { _id: req.user._id }, 
                { $push: { scores: score } })
            .then(results => {
                res.json({ success: true, msg: 'Done updating'})
            })
            .catch(err => {
                res.send({ success: false })
            })
        )

    } else {
        res.status(401).json({ success: false })
    }
}
