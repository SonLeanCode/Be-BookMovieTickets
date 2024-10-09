const {
  createCinemaService,
  getAllCinemasService,
  getCinemaByIdService,
  updateCinemaService,
  deleteCinemaService,
} = require("../services/cinema.service");

const createCinema = async (req, res) => {
  try {
    const { name, address, region_id } = req.body;

    if (!name || !address || !region_id) {
      return res
        .status(400)
        .json({ message: "Name, address, and region_id are required" });
    }

    const cinema = await createCinemaService({ name, address, region_id });
    return res.status(201).json({
      success: true,
      message: "Cinema created successfully",
      cinema,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating cinema", error });
  }
};

const getAllCinemas = async (req, res) => {
  try {
    const cinemas = await getAllCinemasService();
    if (!cinemas || cinemas.length === 0) {
      return res.status(404).json({ message: "Cinemas not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Cinemas retrieved successfully",
      cinemas,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cinemas", error });
  }
};

const getCinemaById = async (req, res) => {
  try {
    const cinema = await getCinemaByIdService(req.params.id);

    if (!cinema) {
      return res.status(404).json({ message: "Cinema not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Cinema retrieved successfully",
      cinema,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching cinema", error });
  }
};

const updateCinema = async (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số URL
    const updatedData = req.body; // Lấy dữ liệu cập nhật từ yêu cầu
  
    try {
      const updatedCinema = await updateCinemaService(id, updatedData); // Gọi service để cập nhật
      res.status(200).json(updatedCinema); // Trả về rạp chiếu phim đã cập nhật
    } catch (error) {
      // Xử lý lỗi tùy thuộc vào thông điệp lỗi
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message }); // Rạp chiếu không tồn tại
      }
      res.status(500).json({ message: 'Không thể cập nhật rạp chiếu: ' + error.message }); // Lỗi máy chủ
    }
  };

const deleteCinema = async (req, res) => {
  try {
    await deleteCinemaService(req.params.id);
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
