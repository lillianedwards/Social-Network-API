const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// http://localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought);

// http://localhost:3001/api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

// http://localhost:3001/api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction)

// http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;