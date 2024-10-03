const express = require('express');
const router = express.Router();
const {
    getGenresByMovie,
    getMoviesByGenre,
    addGenresToMovie,
    removeGenreFromMovie
} = require('../controllers/MovieGenreController');

// Lấy tất cả thể loại của một phim
router.get('/movie/:movieId/genres', getGenresByMovie);

// Lấy tất cả phim có một thể loại cụ thể
router.get('/genre/:genreId/movies', getMoviesByGenre);

// Thêm thể loại vào phim
router.post('/movie/:movieId/genres', addGenresToMovie);

// Xóa thể loại khỏi phim
router.delete('/movie/:movieId/genre/:genreId', removeGenreFromMovie);

module.exports = router;
