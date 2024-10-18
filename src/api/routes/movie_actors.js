const express = require('express');
const actorMovieController = require('../controllers/Movie_ActorController');
const router = express.Router();

router.get('/actor-movies', actorMovieController.getAllActorMovies);
router.get('/movie/:movieId/actors', actorMovieController.getActorsByMovie);
router.get('/actor/:actorId/movies', actorMovieController.getMoviesByActor);
router.post('/movie/:movieId/actors', actorMovieController.addActorsToMovie);
router.delete('/movie/:movieId/actor/:actorId', actorMovieController.removeActorFromMovie);

module.exports = router;
