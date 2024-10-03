const {
  createRegionService,
  getAllRegionsService,
  getRegionByIdService,
  updateRegionService,
  deleteRegionService
} = require('../services/region.service');

// @Post create region controller
const createRegion = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const region = await createRegionService(name);
    return res.status(201).json({
      success: true,
      message: 'Region created successfully',
      region
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error creating region', error: error.message });
  }
};

// @Get all regions controller
const getAllRegions = async (req, res) => {
  try {
    const regions = await getAllRegionsService();
    if (!regions || regions.length === 0) {
      return res.status(404).json({ success: false, message: 'Regions not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Regions retrieved successfully',
      regions
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching regions', error: error.message });
  }
};

// @Get region by ID controller
const getRegionById = async (req, res) => {
  try {
    const region = await getRegionByIdService(req.params.id);

    if (!region) {
      return res.status(404).json({ success: false, message: 'Region not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Region retrieved successfully',
      region
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching region', error: error.message });
  }
};

// @Patch update region controller
const updateRegion = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const updatedRegion = await updateRegionService(req.params.id, name);
    if (!updatedRegion) {
      return res.status(404).json({ success: false, message: 'Region not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Region updated successfully',
      region: updatedRegion
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating region', error: error.message });
  }
};

// @Delete delete region controller
const deleteRegion = async (req, res) => {
  try {
    const deletedRegion = await deleteRegionService(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Region deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting region', error: error.message });
  }
};

module.exports = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion
};
