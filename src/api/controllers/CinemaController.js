const cinemaModel = require('../models/CinemaModel');

const createCinema = async (req, res) => {
  try {
    const { name, address, region_id } = req.body;
    const newCinema = new cinemaModel({ name, address, region_id });
    const savedCinema = await newCinema.save();
    
    return res.status(201).json({
      success: true,
      message: "Cinema created successfully",
      data: savedCinema,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating cinema", error });
  }
};

const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await cinemaModel.find().populate('region_id');
    if (!cinemas || cinemas.length === 0) {
      return res.status(404).json({ message: "Cinemas not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Cinemas retrieved successfully",
      data: cinemas,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cinemas", error });
  }
};

const getCinemaById = async (req, res) => {
  try {
    const cinema = await cinemaModel.findById(req.params.id).populate('region_id');

    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Cinema retrieved successfully",
      data: cinema,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cinema", error });
  }
};

const updateCinema = async (req, res) => {
  const { id } = req.params; // Lấy ID từ tham số URL
  const updatedData = req.body; // Lấy dữ liệu cập nhật từ yêu cầu

  try {
    // Kiểm tra xem có trường nào không hợp lệ không
    if (!updatedData.name && !updatedData.address && !updatedData.region_id) {
      throw new Error('Cần có ít nhất một trường để cập nhật (name, address, hoặc region_id)');
    }

    const updatedCinema = await cinemaModel.findByIdAndUpdate(
      id,
      { ...updatedData, updated_at: Date.now() }, // Cập nhật trường updated_at
      { new: true, runValidators: true } // Đảm bảo rằng các luật kiểm tra được áp dụng
    );

    if (!updatedCinema) {
      throw new Error('Rạp chiếu không tồn tại');
    }

    return res.status(200).json({data: updatedCinema}); // Trả về rạp chiếu phim đã cập nhật
  } catch (error) {
    // Xử lý lỗi tùy thuộc vào thông điệp lỗi
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message }); // Rạp chiếu không tồn tại
    }
    return res.status(500).json({ message: 'Không thể cập nhật rạp chiếu: ' + error.message }); // Lỗi máy chủ
  }
};

const deleteCinema = async (req, res) => {
  try {
    const deletedCinema = await cinemaModel.findByIdAndDelete(req.params.id);
    if (!deletedCinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }
    return res.status(200).json({
      success: true,
      message: "Cinema deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting cinema", error });
  }
};

module.exports = {
  createCinema,
  getAllCinemas,
  getCinemaById,
  updateCinema,
  deleteCinema,
};
