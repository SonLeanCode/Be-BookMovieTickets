const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController');
const upload = require('../../utils/cloudinary/uploadImage'); 

router.get('/movie', movieController.getAllMovie)
router.get('/movie/latest', movieController.getLatestMoviesByCreationDate);
router.get('/movie/:id', movieController.getIdMovie)
router.post('/movie', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'img_video', maxCount: 1 }]), movieController.postMovie)
router.patch('/movie/:id',upload.fields([{ name: 'img', maxCount: 1 }, { name: 'img_video', maxCount: 1 }]), movieController.patchMovie)
router.delete('/movie/:id', movieController.deleteMovie)
module.exports = router;