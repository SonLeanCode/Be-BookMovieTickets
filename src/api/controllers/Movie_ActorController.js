const ActorMovie = require('../models/Actor_Movie'); // Adjust the path as necessary

// Get all actor-movie associations
const getAllActorMovies = async (req, res) => {
    try {
        const actorMovies = await ActorMovie.find().populate('actor_id').populate('movie_id');

        if (!actorMovies || actorMovies.length === 0) {
            return res.status(404).json({ message: 'No actor-movie associations found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Actor-movie associations retrieved successfully',
            data: actorMovies,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching actor-movie associations', error });
    }
};

// Get all actors for a specific movie
const getActorsByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const actorMovies = await ActorMovie.find({ movie_id: movieId }).populate('actor_id');

        if (!actorMovies || actorMovies.length === 0) {
            return res.status(404).json({ message: 'No actors found for this movie' });
        }

        return res.status(200).json({
            success: true,
            message: 'Actors retrieved successfully',
            data: actorMovies,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching actors', error });
    }
};

// Get all movies for a specific actor
const getMoviesByActor = async (req, res) => {
    try {
        const { actorId } = req.params;
        const actorMovies = await ActorMovie.find({ actor_id: actorId }).populate('movie_id');

        if (!actorMovies || actorMovies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this actor' });
        }

        return res.status(200).json({
            success: true,
            message: 'Movies retrieved successfully',
            data: actorMovies,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching movies', error });
    }
};

// Add actors to a movie
const addActorsToMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { actorIds } = req.body;

        // Fetch existing actors for the movie to avoid duplicates
        const existingActors = await ActorMovie.find({ movie_id: movieId }).select('actor_id').lean();
        const existingActorIds = existingActors.map((actor) => actor.actor_id.toString());

        // Prepare actors to add, filtering out any that already exist
        const actorsToAdd = actorIds
            .filter((actorId) => !existingActorIds.includes(actorId)) // Filter out existing actor IDs
            .map((actorId) => ({
                movie_id: movieId,
                actor_id: actorId,
            }));

        // If there are actors to add, insert them
        if (actorsToAdd.length > 0) {
            const addedActors = await ActorMovie.insertMany(actorsToAdd);
            return res.status(201).json({
                success: true,
                message: 'Actors added to movie successfully',
                data: addedActors,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'No new actors to add, all actors already exist for this movie',
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error adding actors to movie', error });
    }
};

// Remove an actor from a movie
const removeActorFromMovie = async (req, res) => {
    try {
        const { movieId, actorId } = req.params;

        const removedActor = await ActorMovie.findOneAndDelete({
            movie_id: movieId,
            actor_id: actorId,
        });

        if (!removedActor) {
            return res.status(404).json({ message: 'Actor not found for this movie' });
        }

        return res.status(200).json({
            success: true,
            message: 'Actor removed from movie successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing actor from movie', error });
    }
};

module.exports = {
    getAllActorMovies,
    getActorsByMovie,
    getMoviesByActor,
    addActorsToMovie,
    removeActorFromMovie,
};