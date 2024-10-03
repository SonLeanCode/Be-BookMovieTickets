const regionModel = require('../models/RegionModel');

// @Get all regions service
const getAllRegionsService = async () => {
  try {
    const regions = await regionModel.find();
    return regions;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to get regions');
  }
};

// @Get region by ID service
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

// @Post create region service
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

// @Patch update region service
const updateRegionService = async (_id, name) => {
  try {
    const updatedRegion = await regionModel.findByIdAndUpdate(
      _id,
      { name, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedRegion) {
      throw new Error('Region not found');
    }
    return updatedRegion;
  } catch (error) {
    console.error('Error in Service', error);
    throw new Error('Unable to update region');
  }
};

// @Delete region service
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
