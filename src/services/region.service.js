const regionModel = require('../models/RegionModel');

const getAllRegionsService = async () => {
  try {
    const regions = await regionModel.find();
    return regions;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to get regions');
  }
};

const getRegionByIdService = async (_id) => {
  try {
    const region = await regionModel.findById(_id);
    if (!region) {
      throw new Error('Region not found');
    }
    return region;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to get region by ID');
  }
};

const createRegionService = async (name) => {
  try {
    const newRegion = new regionModel({ name });
    const savedRegion = await newRegion.save();
    return savedRegion;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to create region');
  }
};

const updateRegionService = async (_id, data) => {
  if (!_id) {
    throw new Error('Region ID is required');
  }

  try {
    const updatedRegion = await regionModel.findByIdAndUpdate(
      _id,
      { ...data, updated_at: Date.now() }, 
      { new: true } 
    );
    return updatedRegion;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to update region');
  }
};


const deleteRegionService = async (_id) => {
  try {
    const deletedRegion = await regionModel.findByIdAndDelete(_id);
    if (!deletedRegion) {
      throw new Error('Region not found');
    }
    return deletedRegion;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to delete region');
  }
};

module.exports = {
  getAllRegionsService,
  getRegionByIdService,
  createRegionService,
  updateRegionService,
  deleteRegionService,
};
