const express = require('express');
const router = express.Router();
const {getAllMovie} = require('../controllers/MovieSTicketsController')
const {getIdMovie} = require('../controllers/MovieSTicketsController')
const {postMovie} = require('../controllers/MovieSTicketsController')
const {patchMovie} = require('../controllers/MovieSTicketsController')
const {deleteMovie} = require('../controllers/MovieSTicketsController')
router.get('/movie', getAllMovie)
router.get('/movie/:id',getIdMovie)
router.post('/movie',postMovie)
router.patch('/movie/:id',patchMovie)
router.delete('/movie/:id',deleteMovie)

module.exports = router;