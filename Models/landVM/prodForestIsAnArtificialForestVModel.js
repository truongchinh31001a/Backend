import mongoose from 'mongoose';

const prodForestIsAnArtificialForestSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
        required : true
    },
    type_of_tree:{
        type: String
    },
    acreage:{
        type: Double
    }
})
const ProdForestIsAnArtificialForest = mongoose.model('ProdForestIsAnArtificialForest',prodForestIsAnArtificialForestSchema)

export default ProdForestIsAnArtificialForest