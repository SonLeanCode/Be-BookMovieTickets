const {
    getAllMovieService,
    postMovieService,
    getIdMovieService,
    patchMovieService,
    deleteMovieService
} = require('../services/movie.service');

// @Get all movies
const getAllMovie = async (req, res) => {
    try {
        const { nameMovie, actor, producer } = req.query;
        const movies = await getAllMovieService({ nameMovie, actor, producer });
        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'Movies not found' });
        }
        return res.status(200).json({ success: true, message: 'Movies retrieved successfully', movies });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@Get by id
const getIdMovie = async (req, res) => {
    try {
        const idMovie = await getIdMovieService(req.params.id);
        if (!idMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json({ success: true, message: 'Movie retrieved successfully', movie: idMovie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@Post movie
const postMovie = async (req, res) => {
    const { image, nameMovie, description, director, price, actor, producer, rating, duration, title, release_date } = req.body;
    const postMovieData = { image, nameMovie, description, director, price, actor, producer, rating, duration, title, release_date }
    const missingFields = Object.keys(postMovieData).filter(field => !postMovieData[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }

    try {
        const movie = await postMovieService(req.body);
        return res.status(201).json({ success: true, message: 'Movie posted successfully', movie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@Patch movie
const patchMovie = async (req, res) => {
    try {
        const updatedMovie = await patchMovieService(req.params.id, req.body);
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json({ success: true, message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@Delete movie
const deleteMovie = async (req, res) => {
    try {
        await deleteMovieService(req.params.id);
        return res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllMovie,
    postMovie,
    getIdMovie,
    patchMovie,
    deleteMovie
};
