const Actor = require('../models/ActorModel');
const cloudinary = require('../../config/cloudinary/cloudinary.config');

// Lấy tất cả diễn viên
const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    return res.status(200).json({data: actors});
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching actors', error });
  }
};

// Lấy một diễn viên theo ID
const getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    res.status(200).json({data: actor});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching actor', error });
  }
};

// Thêm diễn viên mới
const createActor = async (req, res) => {
  const thumbnail_img = req.files.thumbnail_img ? req.files.thumbnail_img[0] : null;
  const feature_img = req.files.feature_img ? req.files.feature_img[0] : null;
  const sub_imgs = req.files.sub_img ? req.files.sub_img : [];

  try {
    if (feature_img && thumbnail_img) {
      const featureUrl = feature_img.path; 
      const thumbnailUrl = thumbnail_img.path
      const newActor = {
        ...req.body,
        thumbnail_img: thumbnailUrl,
        feature_img: featureUrl, // Save the main image URL
        sub_img: sub_imgs.map(file => file.path), // Map the sub-images to their URLs
      };

      const actor = new Actor(newActor);
      await actor.save();

      res.status(201).json({
        message: 'Actor created successfully',
        data: actor,
      });
    } else {
      const newActor = {
        ...req.body
      };
      const actor = new Actor(newActor);
      await actor.save();
      res.status(201).json({
        message: 'Actor created successfully',
        data: actor,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating actor' });
  }
};

// Cập nhật thông tin diễn viên
const updateActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }

    const updateData = {
     ...req.body
    };

    if (req.files) {
      const publicIdsToDelete = [];
      //sửa đường dẫn thành các ảnh mới
      if (req.files.feature_img) {
        updateData.feature_img = req.files.feature_img[0].path; // Update with new main image path
      }

      if (req.files.thumbnail_img) {
        updateData.thumbnail_img = req.files.thumbnail_img[0].path; // Map new sub-images
      }

      if (req.files.sub_img) {
        updateData.sub_img = req.files.sub_img.map(file => file.path); // Map new sub-images
      }

      //Tìm publicId của các ảnh cũ để gửi lên cloudinary xoá
      if (actor.feature_img) {
        const imgPublicId = actor.feature_img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0]; // Lấy public ID
        publicIdsToDelete.push(imgPublicId); // Thêm vào mảng public IDs
      }

      if (actor.thumbnail_img) {
        const imgPublicId = actor.thumbnail_img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0]; // Lấy public ID
        publicIdsToDelete.push(imgPublicId); // Thêm vào mảng public IDs
      }
  
      if (actor.sub_img && actor.sub_img.length > 0) {
        const subImgPublicIds = actor.sub_img.map(img => img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0]);
        publicIdsToDelete.push(...subImgPublicIds);
      }
  
      if (publicIdsToDelete.length > 0) {
        await cloudinary.api.delete_resources(publicIdsToDelete);
      }
    }

    const updatedActor = await Actor.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true });

    res.status(200).json({data:updatedActor});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating actor', error });
  }
};

// Xóa diễn viên
const deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }

    const publicIdsToDelete = [];

    if (actor.feature_img) {
      const imgPublicId = actor.feature_img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0]; // Lấy public ID
      publicIdsToDelete.push(imgPublicId); // Thêm vào mảng public IDs
    }

    if (actor.thumbnail_img) {
      const imgPublicId = actor.thumbnail_img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0]; // Lấy public ID
      publicIdsToDelete.push(imgPublicId); // Thêm vào mảng public IDs
    }


    if (actor.sub_img && actor.sub_img.length > 0) {
      const subImgPublicIds = actor.sub_img.map(img => img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0]);
      publicIdsToDelete.push(...subImgPublicIds);
    }

    if (publicIdsToDelete.length > 0) {
      await cloudinary.api.delete_resources(publicIdsToDelete);
    }

    await Actor.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Actor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting actor', error });
  }
};

module.exports = {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor,
};
