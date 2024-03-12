import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
    parkingId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'parkings'
    },
    slotNum:{
        type:Number,
    },
    isReserved:{
        type:Boolean,
        default:false
    },
    reservedUserId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    imageUrl:{
        type:String,
    }
})

const Slot = mongoose.models.slots || mongoose.model('slots',slotSchema);

export default Slot;