const {
  createRegionService,
  getAllRegionsService,
  getRegionByIdService,
  updateRegionService,
  deleteRegionService
} = require('../services/region.service');

const createRegion = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const region = await createRegionService(name);
    return res.status(201).json({
      success: true,
      message: 'Region created successfully',
      region
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating region', error });
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await getAllRegionsService();
    if (!regions || regions.length === 0) {
      return res.status(404).json({ message: 'Regions not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Regions retrieved successfully',
      regions
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching regions', error });
  }
};

const getRegionById = async (req, res) => {
  try {
    const region = await getRegionByIdService(req.params.id);

    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Region retrieved successfully',
      region
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching region', error });
  }
};

const updateRegion = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const updatedRegion = await updateRegionService(req.params.id, { name });
    if (!updatedRegion) {
      return res.status(404).json({ message: 'Region not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Region updated successfully',
      region: updatedRegion
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating region', error });
  }
};

const deleteRegion = async (req, res) => {
  try {
    await deleteRegionService(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Region deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting region', error });
  }
};

module.exports = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion
};
