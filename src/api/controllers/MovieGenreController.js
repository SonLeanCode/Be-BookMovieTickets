const movieGenreModel = require('../models/MovieGenreModel');

const getAllMovieGenre = async (req, res) => {
    try {
        const genres = await movieGenreModel.find().populate('genre_id').populate('movie_id');

        if (!genres || genres.length === 0) {
            return res.status(404).json({ message: 'No movieGenre found' });
        }

        return res.status(200).json({
            success: true,
            message: 'movieGenre retrieved successfully',
            data: genres,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching movieGenre', error });
    }
};

// Lấy tất cả thể loại của một phim
const getGenresByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const genres = await movieGenreModel.find({ movie_id: movieId }).populate('genre_id');

        return res.status(200).json({
            success: true,
            message: 'Genres retrieved successfully',
            data: genres
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching genres', error });
    }
};

// Lấy tất cả phim có một thể loại cụ thể
const getMoviesByGenre = async (req, res) => {
    try {
        const { genreId } = req.params;
        const movies = await movieGenreModel.find({ genre_id: genreId }).populate('movie_id');

        return res.status(200).json({
            success: true,
            message: 'Movies retrieved successfully',
            data: movies
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching movies', error });
    }
};

// Thêm thể loại vào phim
const addGenresToMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { genreIds } = req.body;

        // Fetch existing genres for the movie to avoid duplicates
        const existingGenres = await movieGenreModel.find({ movie_id: movieId }).select('genre_id').lean();
        const existingGenreIds = existingGenres.map((genre) => genre.genre_id.toString());

        // Prepare genres to add, filtering out any that already exist
        const movieGenresToAdd = genreIds
            .filter((genreId) => !existingGenreIds.includes(genreId)) // Filter out existing genre IDs
            .map((genreId) => ({
                movie_id: movieId,
                genre_id: genreId
            }));

        // If there are genres to add, insert them
        if (movieGenresToAdd.length > 0) {
            const addedGenres = await movieGenreModel.insertMany(movieGenresToAdd);
            return res.status(201).json({
                success: true,
                message: 'Genres added to movie successfully',
                data: addedGenres
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'No new genres to add, all genres already exist for this movie'
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error adding genres to movie', error });
    }
};

// Xóa thể loại khỏi phim
const removeGenreFromMovie = async (req, res) => {
    try {
        const { movieId, genreId } = req.params;

        const removedGenre = await movieGenreModel.findOneAndDelete({
            movie_id: movieId,
            genre_id: genreId
        });

        if (!removedGenre) {
            return res.status(404).json({ message: 'Genre not found for this movie' });
        }

        return res.status(200).json({
            success: true,
            message: 'Genre removed from movie successfully'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing genre from movie', error });
    }
};

module.exports = {
    getAllMovieGenre,
    getGenresByMovie,
    getMoviesByGenre,
    addGenresToMovie,
    removeGenreFromMovie
};
