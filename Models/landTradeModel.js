import mongoose from 'mongoose';

const landTradeSchema = new mongoose.Schema({
    landLicenceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'LandLicence',
        required : true,
    },
    seller_user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    buyer_user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    amount:{
        type : String,
    },
    deposit_amount:{
        type: String
    },
    payment_amount:{
        type: String
    },
    title:{
        type: String
    },
    descirbe:{
        type: String
    },
    price:{
        type: Number
    },
    numberLand:{
        type: String
    },
    numberMap:{
        type: String
    },
    addressLand:{
        type: String
    },
    timeUse:{
        type: String
    },
    TargetUses:{
        type: String
    },
    form_use:{
        type: String
    },
    origin_of_use:{
        type: String
    },
    image_url:{
        type: String
    },
    imagePlotMap:{
        type: String
    },
    incomeTax:{
        type: Number
    },
    timeDeposit:{
        type: Number
    },
    remainingAmount:{
        type: Number
    },
    amountReceived:{
        type: Number
    },
    comment:{
        type: String
    },
    status:{
        type: String,
        enum: ['listed for sale', 'deposit made', 'deposit confirmed', ' payment successful, transaction completed'],
        default: 'None'
    },
    startDate:{
        type: Date
    },
    endDate:{
        type: Date
    }
})

const LandTrade = mongoose.model('LandTrade',landTradeSchema)

export default LandTrade