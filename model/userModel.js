const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name : { type: String, lowercased: true},
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true},
});

module.exports = userModel = model("userDbNew", userSchema)