import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    wallet_address:{
        type: String,
        required: true,
    },
    nonce:{
        type: Number
    },
    full_name:{
        type: String
    },
    id_card:{
        type:String
    },
    birthday:{
        type:Date
    },
    hometown:{
        type:String
    },
    permanent_address:{
        type:String
    },
    idCard_front_url:{
        type:String
    },
    idCard_back_url:{
        type:String
    },
    email:{
        type: String,
        required : false
    },
    verifiedEmail:{
        type:Boolean
    },
    verifiedStatus:{
        type: String,
        enum :['not verified','submitted KYC','approved', 'rejected'],
        default : 'not verified',
    }
},{
    timestamps:true,
})

const User = mongoose.model('User', userSchema);

export default User