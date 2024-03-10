import mongoose from 'mongoose';

const landLicenceSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        enum: ['draft','onBlockchain','for sale'],
        default: 'none'
    },
    land_lot: { 
        type: String
    },
    house_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'House',
    },
    other_construction_works:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'OtherConstructionWork',
    },
    prod_forest_is_an_artificial_forest: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ProdForestIsAnArtificialForest',
    },
    perennial_trees:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'PerennialTree',
    },
    notice:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Notice',
    },
    diagram_url:{
        type: String
    },
    idBlockchain:{
        type:String
    },
    ipfsHash:{
        type:String
    },
    transactionHash:{
        type:String
    }
})

const LandLicence = mongoose.model('LandLicense',landLicenceSchema)

export default LandLicence