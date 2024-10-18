const express = require('express');
const {
  createCinema,
  getAllCinemas,
  getCinemaById,
  updateCinema,
  deleteCinema,
} = require('../controllers/CinemaController');

const router = express.Router();

router.post('/cinema', createCinema);
router.get('/cinema', getAllCinemas);
router.get('/cinema/:id', getCinemaById);
router.patch('/cinema/:id', updateCinema);
router.delete('/cinema/:id', deleteCinema);

module.exports = router;
