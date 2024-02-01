import mongoose from 'mongoose';

const otpSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code:{
        type: String,
        required: true
    },
    expiredTime: {
        type: Date,
    }
},{
    timestamps: true,
})

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;