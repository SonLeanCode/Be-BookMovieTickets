const genreModel = require('../models/GenreModel');

const getAllGenreService = async ({ name }) => {
    let query = {};
    try {
        if (name && name.trim() !== '') {
            query.name = { $regex: '.*' + name + '.*', $options: 'i' };
        }

        const genres = await genreModel.find(query);
        return genres;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to get genres');
    }
};

const getIdGenreService = async (_id) => {
    try {
        const genre = await genreModel.findOne({ _id });
        if (!genre) {
            throw new Error('Genre not found');
        }
        return genre;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to get genre by ID');
    }
};

const postGenreService = async (data) => {
    if (!data) {
        throw new Error('Invalid data');
    }
    try {
        const newGenre = new genreModel({
            name: data.name
        });
        const genreData = await newGenre.save();
        return genreData;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to post genre');
    }
};

const patchGenreService = async (_id, data) => {
    if (!_id) {
        throw new Error('Genre ID is required');
    }
    try {
        const updatedGenre = await genreModel.findByIdAndUpdate(
            _id,
            {
                name: data.name !== undefined ? data.name : undefined
            },
            { new: true } 
        );
        return updatedGenre;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to update genre');
    }
};


const deleteGenreService = async (_id) => {
    if (!_id) {
        throw new Error('Genre ID is required');
    }
    try {
        const deletedGenre = await genreModel.findByIdAndDelete(_id);
        if (!deletedGenre) {
            throw new Error('Genre not found');
        }
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to delete genre');
    }
};

module.exports = {
    getAllGenreService,
    getIdGenreService,
    postGenreService,
    patchGenreService,
    deleteGenreService
};
