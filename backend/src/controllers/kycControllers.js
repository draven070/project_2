import KYC from '../models/kycModels.js';

export const createKYC = async (req, res) => {
  try {
    console.log("Uploaded Files:", req.files);

    const { name, citizenshipNumber ,email} = req.body;
    const profileImage = req.files.profileImage ? req.files.profileImage[0].filename : null; // ✅ Fixed typo
    const citizenshipPhoto = req.files.citizenshipPhoto ? req.files.citizenshipPhoto[0].filename : null;
    const cv = req.files.cv ? req.files.cv[0].filename : null;

    console.log(name, citizenshipNumber, profileImage, citizenshipPhoto);

    if (!name || !citizenshipNumber || !profileImage || !citizenshipPhoto) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newKYC = new KYC({
      name,
      email,
      citizenshipNumber,
      profileImage,
      citizenshipPhoto,
      cv,
    });

    await newKYC.save();

    res.status(201).json({ message: 'KYC form submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};
export const getAllKYCs = async (req, res) => {
  try {
    const kycs = await KYC.find();
    res.status(200).json(kycs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching KYC submissions", error: error.message });
  }
};

// Get a single KYC submission by ID
export const getKYCById = async (req, res) => {
  try {
    const kyc = await KYC.findById(req.params.id);
    if (!kyc) {
      return res.status(404).json({ message: "KYC submission not found" });
    }
    res.status(200).json(kyc);
  } catch (error) {
    res.status(500).json({ message: "Error fetching KYC", error: error.message });
  }
};

// Delete a KYC submission
export const deleteKYC = async (req, res) => {
  try {
    const deletedKYC = await KYC.findByIdAndDelete(req.params.id);
    if (!deletedKYC) {
      return res.status(404).json({ message: "KYC submission not found" });
    }
    res.status(200).json({ message: "KYC submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting KYC", error: error.message });
  }
};