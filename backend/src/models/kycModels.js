// models/KYC.js
import mongoose from 'mongoose';

const kycSchema = new mongoose.Schema({

  name: { 
    type: String,
     required: true
     },
  citizenshipNumber: { 
    type: Number, 
    required: true
 },
 profileImage: {
     type: String,
      required: true
     },
  citizenshipPhoto: { 
    type: String,
     required: true },
  cv: { 
    type: String 
},
email: { 
  type: String 
},
}, { timestamps: true });

const KYC = mongoose.model('KYC', kycSchema);

export default KYC;