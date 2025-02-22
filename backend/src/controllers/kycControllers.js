import KYC from '../models/kycModels.js';

export const createKYC = async (req, res) => {
  try {
    console.log("Uploaded Files:", req.files);

    const { name, citizenshipNumber } = req.body;
    const profileImage = req.files.profileImage ? req.files.profileImage[0].filename : null; // ✅ Fixed typo
    const citizenshipPhoto = req.files.citizenshipPhoto ? req.files.citizenshipPhoto[0].filename : null;
    const cv = req.files.cv ? req.files.cv[0].filename : null;

    console.log(name, citizenshipNumber, profileImage, citizenshipPhoto);

    if (!name || !citizenshipNumber || !profileImage || !citizenshipPhoto) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newKYC = new KYC({
      name,
      citizenshipNumber,
      profileImage,
      citizenshipPhoto,
      cv,
    });

    await newKYC.save();

    res.status(201).json({ message: 'KYC form submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};
