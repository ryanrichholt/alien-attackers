const mongoose = require("mongoose");
const passport = require("passport");
const { User } = require("../models");

module.exports.getProfile = function(req, res){
    // req.user is the user identity added by passport if the request comes 
    // from an authenticated session
	if(req.user){
		res.json({success: true, user: req.user})	
	} else {
		res.status(401).json({ success: false })
	}
}

