const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // TODO Validate email
    },
    password: {
        type: String,
        required: true,
    },
    pilotName: {
        type: String
    },
	shipName: {
		type: String,
        default: "Millenium Falcon"
	}
});

// Password hash middleware.
userSchema.pre("save", function(next) {
    var user = this
    if (!user.isModified("password")) return next()
    bcrypt.genSalt(5, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

// Defining our own custom document instance method
userSchema.methods = {
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) return cb(err)
            cb(null, isMatch)
        })
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;