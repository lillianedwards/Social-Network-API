module.exports = {
//Get all Thoughts
async getThoughts (req, res) {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err)
  }
},
//Get a Single Thought
async getSingleThought (req,res) {
  try {
    const singleThought = await Thought.findOne({
      _id: req.params.thoughtId
    })
    if(!singleThought) {
      return res.status(404).json({message: 'No thought with that Id 😧'});
    }
    res.status(200).json(singleThought)
  } catch (err) {
    res.status(500).json(err);

  }
},
// Create a thought and push created thought to associated User's thoughts
async createThought (req, res) {
  try {
    const newThought = await Thought.create(req.body);
    const user = User.findOneAndUpdate(
      {_id: req.body.userId},
      {$addToSet {thoughts: thought._id}},
      {new: true}
    );
    !user
      ? res.status(404).json({message: 'Thought created, but not user found with that Id 🥴'})
      : res.status(200).json(newThought, {message: 'Created thought and attached to user!'})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
//Update a thought by it's ID
async updateThought (req, res) {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      {runValidators: true, new: true}
    );
    !updatedThought
      ? res.status(404).json({message: 'No thought found with that Id! 😓'})
      : res.status(200).json(updatedThought, {message: `Thought: ${thoughtId} updated! 👻`})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
async deleteThought (req, res) {
  try {
    const deletedThought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
    !deletedThought
      ? res.status(404).json({message: 'No thought found with that Id! 😪'})
      : res.status(200).json(deletedThought, {message: `Thought: ${thoughtId} has been deleted, taking a dirt nap ☠️`})

  } catch {


  }
}



}