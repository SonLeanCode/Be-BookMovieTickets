const express = require('express');
const router = express.Router();
const {getAllMovie} = require('../controllers/MovieController')
const {getIdMovie} = require('../controllers/MovieController')
const {postMovie} = require('../controllers/MovieController')
const {patchMovie} = require('../controllers/MovieController')
const {deleteMovie} = require('../controllers/MovieController')
router.get('/movie', getAllMovie)
router.get('/movie/:id',getIdMovie)
router.post('/movie',postMovie)
router.patch('/movie/:id',patchMovie)
router.delete('/movie/:id',deleteMovie)

module.exports = router;