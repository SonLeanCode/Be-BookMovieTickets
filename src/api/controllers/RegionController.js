const regionModel = require('../models/RegionModel');

// Get all regions
const getAllRegions = async (req, res) => {
  try {
    const regions = await regionModel.find();
    if (!regions || regions.length === 0) {
      return res.status(404).json({ message: 'Regions not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Regions retrieved successfully',
      data: regions
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching regions', error });
  }
};

// Get region by ID
const getRegionById = async (req, res) => {
  try {
    const region = await regionModel.findById(req.params.id);
    if (!region) {
      return res.status(404).json({ message: 'Region not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Region retrieved successfully',
      data: region
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching region', error });
  }
};

// Create a new region
const createRegion = async (req, res) => {
  const { name } = req.body;

  try {
    const newRegion = new regionModel({ name });
    const savedRegion = await newRegion.save();
    return res.status(201).json({
      success: true,
      message: 'Region created successfully',
      data: savedRegion
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating region', error });
  }
};

// Update region
const updateRegion = async (req, res) => {
  const { name } = req.body;

  try {
    const updatedRegion = await regionModel.findByIdAndUpdate(
      req.params.id,
      { name, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedRegion) {
      return res.status(404).json({ message: 'Region not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Region updated successfully',
      data: updatedRegion
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating region', error });
  }
};

// Delete region
const deleteRegion = async (req, res) => {
  try {
    const deletedRegion = await regionModel.findByIdAndDelete(req.params.id);
    if (!deletedRegion) {
      return res.status(404).json({ message: 'Region not found' });
    }
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
