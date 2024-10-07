const express = require('express');
const router = express.Router();
const { getAllMovie } = require('../controllers/MovieController')
const { getIdMovie } = require('../controllers/MovieController')
const { postMovie } = require('../controllers/MovieController')
const { patchMovie } = require('../controllers/MovieController')
const { deleteMovie } = require('../controllers/MovieController')
const { movieValidator } = require('../validator')
router.get('/movie', getAllMovie)
router.get('/movie/:id', getIdMovie)
router.post('/movie', postMovie, movieValidator.validateMovie)
router.patch('/movie/:id', patchMovie)
router.delete('/movie/:id', deleteMovie)

module.exports = router;