const { User, Thought } = require('../models');

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
    const user = await Course.findOne({ _id: req.params.userId})
    .select('-__v');
    if (!course) {
      return res.status(404).json({message: 'No user with that ID'})
    }
    res.json(user);
  } catch {


  }
}





}
