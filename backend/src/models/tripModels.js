import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    location: { 
        type: String, 
        required: true
     },
    dateFrom: { 
        type: Date, 
        required: true 
    },
    dateTo: {
         type: Date
         },
    numPeople: { 
        type: String, 
        required: true },
    priceBid: {
         type: String,
         required: true },
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
