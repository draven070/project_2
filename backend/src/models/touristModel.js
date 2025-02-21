import mongoose from 'mongoose';

const touristSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
     
     roles:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
     }
}, { timestamps: true });

const Tourist = mongoose.model("Tourist", touristSchema);
export default Tourist;
