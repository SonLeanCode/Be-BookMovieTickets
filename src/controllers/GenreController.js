const { getAllGenreService } = require('../services/genre.service');
const { getIdGenreService } = require('../services/genre.service');
const { postGenreService } = require('../services/genre.service');
const { patchGenreService } = require('../services/genre.service');
const { deleteGenreService } = require('../services/genre.service');

// Get all genres
const getAllGenre = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            const allGenres = await getAllGenreService({});
            return res.status(200).json({ success: true, message: 'Get all genres successfully', genres: allGenres });
        }
        const genre = await getAllGenreService({ name });
        if (!genre || genre.length === 0) {
            return res.status(400).json({ message: 'Not found get data' });
        }
        return res.status(200).json({ success: true, message: 'Get genre successfully', genre });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get :id 
const getIdGenre = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'id not found' });
    }
    try {
        const idGenre = await getIdGenreService(id);
        if (!idGenre) {
            res.status(400).json({ message: 'Not found get id data' });
        }
        res.status(200).json({ success: true, message: 'Get id genre successfully', idGenre });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Post 
const postGenre = async (req, res) => {
    const { name } = req.body;
    const postGenreData = { name };

    // Check for missing fields
    const missingFields = Object.keys(postGenreData).filter(field => !postGenreData[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }
    try {
        const genre = await postGenreService(postGenreData);
        res.status(200).json({ success: true, message: 'Post genre successfully', genre });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Patch 
const patchGenre = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'not found id patch' });
    }
    const { name } = req.body;
    const patchGenreData = { name };
    try {
        const genreUpdate = await patchGenreService(id, patchGenreData);
        res.status(200).json({ success: true, message: 'Patch genre successfully', genreUpdate });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete 
const deleteGenre = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'not found id delete' });
    }
    try {
        await deleteGenreService(id);
        res.status(200).json({ success: true, message: 'Genre deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllGenre,
    postGenre,
    getIdGenre,
    patchGenre,
    deleteGenre
};
