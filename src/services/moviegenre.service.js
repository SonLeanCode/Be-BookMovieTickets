const movieGenreModel = require('../models/MovieGenreModel');

// Get tất cả các thể loại của một phim
const getGenresByMovieService = async (movieId) => {
    try {
        const movieGenres = await movieGenreModel.find({ movie_id: movieId }).populate('genre_id');
        return movieGenres;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to get genres for the movie');
    }
};

// Get tất cả các phim có một thể loại cụ thể
const getMoviesByGenreService = async (genreId) => {
    try {
        const moviesByGenre = await movieGenreModel.find({ genre_id: genreId }).populate('movie_id');
        return moviesByGenre;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to get movies for the genre');
    }
};

// Post thêm thể loại vào phim
const addGenresToMovieService = async (movieId, genreIds) => {
    try {
        const movieGenres = genreIds.map((genreId) => ({
            movie_id: movieId,
            genre_id: genreId
        }));

        const createdMovieGenres = await movieGenreModel.insertMany(movieGenres);
        return createdMovieGenres;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to add genres to movie');
    }
};

// Delete thể loại khỏi phim
const removeGenreFromMovieService = async (movieId, genreId) => {
    try {
        const deletedMovieGenre = await movieGenreModel.findOneAndDelete({
            movie_id: movieId,
            genre_id: genreId
        });
        return deletedMovieGenre;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to remove genre from movie');
    }
};

module.exports = {
    getGenresByMovieService,
    getMoviesByGenreService,
    addGenresToMovieService,
    removeGenreFromMovieService
};
