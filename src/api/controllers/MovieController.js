const MovieSticketsModel = require('../models/MovieModel');
const cloudinary = require('../../config/cloudinary/cloudinary.config');
const PAGINATION = require('../../constants/panigateConstants');

// Get all movies
const getAllMovie = async (req, res) => {
  try {
    const { name, producer, page, limit } = req.query;
    let query = {};

    if (name && name.trim() !== '') {
      query.name = { $regex: '.*' + name + '.*', $options: 'i' };
    }
    if (producer && producer.trim() !== '') {
      query.producer = { $regex: '.*' + producer + '.*', $options: 'i' };
    }

    let movies;
    if (!page && !limit) {
      movies = await MovieSticketsModel.find(query).sort({ createdAt: -1 });
    } else {
      const options = PAGINATION.options(req, {
        sort: { createdAt: -1 }
      });
      const querys = PAGINATION.query(req, query);
      movies = await MovieSticketsModel.paginate(querys, options);
    }

    if (!movies || movies.length === 0) {
      return res.status(200).json(movies);
    }
    return res.status(200).json({ success: true, message: 'Movies retrieved successfully', data: movies });
  } catch (error) {
    console.error('Error in getting all movies:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get movie by ID
const getIdMovie = async (req, res) => {
  try {
    const movie = await MovieSticketsModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(200).json({ success: true, message: 'Movie retrieved successfully', data: movie });
  } catch (error) {
    console.error('Error in getting movie by ID:', error);
    res.status(400).json({ message: error.message });
  }
};

// Create a new movie with Cloudinary upload
const postMovie = async (req, res) => {
  const img = req.files.img ? req.files.img[0] : null;
  const img_video = req.files.img_video ? req.files.img_video[0] : null;

  try {
    const newMovieData = {
      ...req.body,
      img: img ? img.path : null,
      img_video: img_video ? img_video.path : null
    };

    const newMovie = new MovieSticketsModel(newMovieData);
    const movie = await newMovie.save();
    return res.status(201).json({ success: true, message: 'Movie created successfully', data: movie });
  } catch (error) {
    console.error('Error in creating movie:', error);
    return res.status(500).json({ success: false, message: 'Failed to create movie', error: error.message });
  }
};

// Update movie
const patchMovie = async (req, res) => {
    try {
      const movie = await MovieSticketsModel.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      const updateData = { ...req.body };
      
      if (req.files) {
        const publicIdsToDelete = [];
        // Kiểm tra nếu có ảnh chính mới
        if (req.files.img) {
          // Thêm public ID ảnh cũ vào danh sách để xóa
          if (movie.img) {
            const imgPublicId = movie.img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0];
            publicIdsToDelete.push(imgPublicId);
          }
          // Cập nhật ảnh mới
          updateData.img = req.files.img[0].path;
        }
        // Kiểm tra nếu có ảnh video thumbnail mới
        if (req.files.img_video) {
          // Thêm public ID video cũ vào danh sách để xóa
          if (movie.img_video) {
            const videoImgPublicId = movie.img_video.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0];
            publicIdsToDelete.push(videoImgPublicId);
          }
          // Cập nhật video thumbnail mới
          updateData.img_video = req.files.img_video[0].path;
        }

        // Tìm publicIds của các ảnh cũ
        if (movie.img) {
        const imgPublicId = movie.img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0];
        publicIdsToDelete.push(imgPublicId);
        }
        if (movie.img_video) {
        const videoImgPublicId = movie.img_video.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0];
        publicIdsToDelete.push(videoImgPublicId);
        }
        // Xóa các ảnh cũ trên Cloudinary nếu có
        if (publicIdsToDelete.length > 0) {
          await cloudinary.api.delete_resources(publicIdsToDelete);
        }
      }
  
      const updatedMovie = await MovieSticketsModel.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true });
      return res.status(200).json({ success: true, message: 'Movie updated successfully', data: updatedMovie });
    } catch (error) {
      console.error('Error in updating movie:', error);
      res.status(400).json({ message: error.message });
    }
  };
  

// Delete movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await MovieSticketsModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const publicIdsToDelete = [];
    if (movie.img) {
      const imgPublicId = movie.img.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0];
      publicIdsToDelete.push(imgPublicId);
    }
    if (movie.img_video) {
      const videoImgPublicId = movie.img_video.split('/upload/')[1].split('/').slice(1).join('/').split('.')[0];
      publicIdsToDelete.push(videoImgPublicId);
    }

    if (publicIdsToDelete.length > 0) {
      await cloudinary.api.delete_resources(publicIdsToDelete);
    }

    await MovieSticketsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error in deleting movie:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get latest movies by creation date
const getLatestMoviesByCreationDate = async (req, res) => {
  try {
    const latestMovies = await MovieSticketsModel.find()
      .sort({ createdAt: -1 })
      .limit(9);
    return res.json({ success: true, message: 'Latest movies retrieved successfully', data: latestMovies });
  } catch (error) {
    console.error('Error fetching latest movies by creation date:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  getAllMovie,
  getIdMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  getLatestMoviesByCreationDate
};
