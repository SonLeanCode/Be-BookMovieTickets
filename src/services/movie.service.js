const movieModel = require('../models/MovieModel');

//@Get service
const getAllMovieService = async ({ nameMovie, actor, producer }) => {
    let query = {};
    try {
        if (nameMovie?.trim()) {
            query.nameMovie = { $regex: '.*' + nameMovie + '.*', $options: 'i' };
        }
        if (actor?.trim()) {
            query.actor = { $regex: '.*' + actor + '.*', $options: 'i' };
        }
        if (producer?.trim()) {
            query.producer = { $regex: '.*' + producer + '.*', $options: 'i' };
        }

        const movies = await movieModel.find(query);
        return movies;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to get movie');
    }
};

//@Get:id
const getIdMovieService = async (_id) => {
    try {
        const getIdMovie = await movieModel.findById(_id);
        return getIdMovie;
    } catch (error) {
        throw new Error('Unable to get movie by ID');
    }
};

//@Post service
const postMovieService = async (data) => {
    if (!data) {
        throw new Error('Invalid data');
    }
    try {
        const newMovie = new movieModel({
            image: data.image,
            nameMovie: data.nameMovie,
            description: data.description,
            director: data.director,
            price: data.price,
            actor: data.actor,
            producer: data.producer,
            rating: data.rating,
            duration: data.duration,
            title: data.title,
            release_date: data.release_date
        });
        const savedMovie = await newMovie.save();
        return savedMovie;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to post movie');
    }
};

//@Patch service
const patchMovieService = async (_id, data) => {
    if (!_id) {
        throw new Error('Movie ID is required');
    }
    try {
        const updatedMovie = await movieModel.findByIdAndUpdate(
            _id,
            {
                image: data.image ?? undefined,
                nameMovie: data.nameMovie ?? undefined,
                description: data.description ?? undefined,
                director: data.director ?? undefined,
                price: data.price ?? undefined,
                actor: data.actor ?? undefined,
                producer: data.producer ?? undefined,
                rating: data.rating ?? undefined,
                duration: data.duration ?? undefined,
                title: data.title ?? undefined,
                release_date: data.release_date ?? undefined
            },
            { new: true }
        );

        return updatedMovie;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to update movie');
    }
};

//@Delete service
const deleteMovieService = async (_id) => {
    try {
        const deletedMovie = await movieModel.findByIdAndDelete(_id);
        if (!deletedMovie) {
            throw new Error('Movie not found');
        }
        return deletedMovie;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to delete movie');
    }
};

module.exports = {
    getAllMovieService,
    postMovieService,
    getIdMovieService,
    patchMovieService,
    deleteMovieService
};
