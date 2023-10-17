const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema ({
  reactionId: {
    type: Schema.Types.ObjectId,
    
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: [280, 'Too many characters'],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: date => new Date(date).toLocaleString()
  }
});


const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: [1, "Too few characters"],
    maxLength: [280, "Too many characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: date => new Date(date).toLocaleString()
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    virtual: true,
  },
  id: false
}
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
});

const Thought = model('user', thoughtSchema);

module.exports = Thought;