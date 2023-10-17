const {Schema, Types} = require('mongoose');

const userSchema = new Schema (
{
username: {type: String, required: true, unique: true, trim: true},
email: {type: String, required: true, unique: true, lowercase: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/},
thoughts: []
}

)