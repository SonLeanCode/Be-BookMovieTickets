const {
    getGenresByMovieService,
    getMoviesByGenreService,
    addGenresToMovieService,
    removeGenreFromMovieService
} = require('../services/moviegenre.service');

// @Get: Lấy tất cả thể loại của một phim
const getGenresByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const genres = await getGenresByMovieService(movieId);

        if (!genres || genres.length === 0) {
            return res.status(404).json({ message: 'No genres found for this movie' });
        }

        return res.status(200).json({
            success: true,
            message: 'Genres retrieved successfully',
            genres
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching genres', error });
    }
};

// @Get: Lấy tất cả phim có một thể loại cụ thể
const getMoviesByGenre = async (req, res) => {
    try {
        const { genreId } = req.params;
        const movies = await getMoviesByGenreService(genreId);

        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this genre' });
        }

        return res.status(200).json({
            success: true,
            message: 'Movies retrieved successfully',
            movies
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching movies', error });
    }
};

// @Post: Thêm thể loại vào phim
const addGenresToMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { genreIds } = req.body;

        if (!genreIds || !Array.isArray(genreIds) || genreIds.length === 0) {
            return res.status(400).json({ message: 'Genre IDs are required and should be an array' });
        }

        const addedGenres = await addGenresToMovieService(movieId, genreIds);
        return res.status(201).json({
            success: true,
            message: 'Genres added to movie successfully',
            addedGenres
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding genres to movie', error });
    }
};

// @Delete: Xóa thể loại khỏi phim
const removeGenreFromMovie = async (req, res) => {
    try {
        const { movieId, genreId } = req.params;

        const removedGenre = await removeGenreFromMovieService(movieId, genreId);

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
    getGenresByMovie,
    getMoviesByGenre,
    addGenresToMovie,
    removeGenreFromMovie
};
