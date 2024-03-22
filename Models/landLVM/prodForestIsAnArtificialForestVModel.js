import mongoose from 'mongoose';

const prodForestIsAnArtificialForestSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
    },
    type_of_tree:{
        type: String
    },
    acreage:{
        type: Number
    }
})
const ProdForestIsAnArtificialForest = mongoose.model('ProdForestIsAnArtificialForest',prodForestIsAnArtificialForestSchema)

export default ProdForestIsAnArtificialForest