const express = require('express');
const router = express.Router();
const actorController = require('../controllers/ActorController');
const upload = require('../../utils/cloudinary/uploadImage'); // Import middleware đã cấu hình cho Cloudinary

router.get('/actor', actorController.getAllActors);

// Lấy diễn viên theo ID
router.get('/actor/:id', actorController.getActorById);

// Create a new actor with upload for main image (img) and multiple sub-images (sub_img)
router.post('/actor', upload.fields([{ name: 'thumbnail_img', maxCount: 1 },{ name: 'feature_img', maxCount: 1 }, { name: 'sub_img', maxCount: 10 }]), actorController.createActor);

// Update actor information
router.patch('/actor/:id', upload.fields([{ name: 'thumbnail_img', maxCount: 1 },{ name: 'feature_img', maxCount: 1 }, { name: 'sub_img', maxCount: 10 }]), actorController.updateActor);

// Xóa diễn viên
router.delete('/actor/:id', actorController.deleteActor);


module.exports = router;
