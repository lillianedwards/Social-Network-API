const { User, Thought } = require("../models");

module.exports = {
  //Get All Users ✅
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Get A User ✅ 
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      )
      .populate("thoughts");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Create a User ✅
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //Update User ✅ 
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
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Delete User and Associated Thoughts ✅
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deletedUser) {
        return res
          .status(404)
          .json({ message: "No user with that Id exists 😞" });
      }
      await Thought.deleteMany({
        _id: { $in: deletedUser.thoughts },
      });
      res
        .status(200)
        .json({
          message: "User and associated thoughts successfully deleted.",
        });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  //Add /Create Friend ✅

  async addFriend(req, res) {
    try {
      console.log("You are adding a friend");
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID😩" })
      };
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Delete Friend ✅
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId  } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No student with that Id 🥺" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
