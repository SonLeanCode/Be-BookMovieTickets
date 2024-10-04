const express = require('express');
const router = express.Router();
const { getAllGenre, getIdGenre, postGenre, patchGenre, deleteGenre } = require('../controllers/GenreController');

router.get('/genre', getAllGenre);
router.get('/genre/:id', getIdGenre);
router.post('/genre', postGenre);
router.patch('/genre/:id', patchGenre);
router.delete('/genre/:id', deleteGenre);

module.exports = router;
