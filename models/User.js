const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String }
});

// compare passwords 
UserSchema.methods.comparePassword = function (candidatePassword) {
    return candidatePassword === this.password;;
}

module.exports = mongoose.model("User", UserSchema);