const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {type: String, unique : true},
    avg_rating : Number,
    gallery : []
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;