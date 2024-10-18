const genreModel = require('../models/GenreModel');

// Get all genres
const getAllGenre = async (req, res) => {
    try {
        const { name } = req.query;
        let query = {};

        if (name && name.trim() !== '') {
            query.name = { $regex: '.*' + name + '.*', $options: 'i' };
        }

        const allGenres = await genreModel.find(query);
        return res.status(200).json({ success: true, message: 'Get all genres successfully', data: allGenres });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get genre by ID
const getIdGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await genreModel.findById(id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        return res.status(200).json({ success: true, message: 'Get genre successfully', data: genre });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Post new genre
const postGenre = async (req, res) => {
    const { name } = req.body;

    // Tạo genre mới
    const newGenre = new genreModel({ name });
    try {
        const genre = await newGenre.save();
        return res.status(201).json({ success: true, message: 'Genre created successfully', data: genre });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Patch genre
const patchGenre = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedGenre = await genreModel.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        return res.status(200).json({ success: true, message: 'Genre updated successfully', data: updatedGenre });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete genre
const deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGenre = await genreModel.findByIdAndDelete(id);
        if (!deletedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        return res.status(200).json({ success: true, message: 'Genre deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllGenre,
    postGenre,
    getIdGenre,
    patchGenre,
    deleteGenre
};
