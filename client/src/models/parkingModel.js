import mongoose from 'mongoose';

const parkingSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    description:{
        type:String,
    },
    pricePerSlot:{
        type : Number,
        required: true,
    },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], index: '2dsphere' } // Indexing for geospatial queries
    }
})
parkingSchema.index({ location: '2dsphere' });
const Parking = mongoose.models.parkings || mongoose.model('parkings',parkingSchema);

export default Parking;