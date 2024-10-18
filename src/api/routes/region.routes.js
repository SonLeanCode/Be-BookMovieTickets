const express = require('express');
const router = express.Router();
const regionController = require('../controllers/RegionController');

// Route CRUD
router.post('/regions', regionController.createRegion);
router.get('/regions', regionController.getAllRegions);
router.get('/regions/:id', regionController.getRegionById);
router.patch('/regions/:id', regionController.updateRegion);
router.delete('/regions/:id', regionController.deleteRegion);

module.exports = router;
