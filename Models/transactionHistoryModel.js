import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    landTradeId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'LandTrade',
        required: true
    },
    type:{
        type: String,
        enum :['deposit request','accept transaction','payment', 'confirm transaction'],
        default : 'None' 
    },
    amount:{
        type: String
    },
    txHash:{
        type: String
    },
    transaction_date:{
        type: Date
    },
    updated_at:{
        type: Date
    }
},{
    timestamps: true,
})

const TransactionHistory = mongoose.model('TransactionHistory', transactionSchema);

export default TransactionHistory;