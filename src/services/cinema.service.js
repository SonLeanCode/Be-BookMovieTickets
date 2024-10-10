const cinemaModel = require('../models/CinemaModel');

const getAllCinemasService = async () => {
  try {
    const cinemas = await cinemaModel.find().populate('region_id');
    return cinemas;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to get cinemas');
  }
};

const getCinemaByIdService = async (_id) => {
  try {
    const cinema = await cinemaModel.findById(_id).populate('region_id');
    if (!cinema) {
      throw new Error('Cinema not found');
    }
    return cinema;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to get cinema by ID');
  }
};

const createCinemaService = async ({ name, address, region_id }) => {
  try {
    const newCinema = new cinemaModel({ name, address, region_id });
    const savedCinema = await newCinema.save();
    return savedCinema;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to create cinema');
  }
};

const updateCinemaService = async (_id, data) => {
    if (!_id) {
      throw new Error('ID rạp chiếu là bắt buộc');
    }
  
    // Kiểm tra xem có trường nào không hợp lệ không
    if (!data.name && !data.address && !data.region_id) {
      throw new Error('Cần có ít nhất một trường để cập nhật (name, address, hoặc region_id)');
    }
  
    try {
      const updatedCinema = await cinemaModel.findByIdAndUpdate(
        _id,
        { ...data, updated_at: Date.now() }, // Cập nhật trường updated_at
        { new: true, runValidators: true } // Đảm bảo rằng các luật kiểm tra được áp dụng
      );
  
      if (!updatedCinema) {
        throw new Error('Rạp chiếu không tồn tại');
      }
  
      return updatedCinema; // Trả về rạp chiếu đã cập nhật
    } catch (error) {
      console.error('Lỗi trong Service:', error.message);
      throw new Error('Không thể cập nhật rạp chiếu: ' + error.message); // Trả về thông điệp lỗi
    }
  };
  

const deleteCinemaService = async (_id) => {
  try {
    const deletedCinema = await cinemaModel.findByIdAndDelete(_id);
    if (!deletedCinema) {
      throw new Error('Cinema not found');
    }
    return deletedCinema;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to delete cinema');
  }
};

module.exports = {
  getAllCinemasService,
  getCinemaByIdService,
  createCinemaService,
  updateCinemaService,
  deleteCinemaService,
};
