const { User, Thought } = require("../models");

module.exports = {
  //Get All Users
  async getUsers(req, res) {
    try {
      const users = await Course.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get A User
  async getSingleUser(req, res) {
    try {
      const user = await Course.findOne({ _id: req.params.userId }).
      select("-__v");
      populate('thoughts');
      if (!course) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json(user)
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Create a User
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};


//Add /Create Friend 

async

//Delete Friend