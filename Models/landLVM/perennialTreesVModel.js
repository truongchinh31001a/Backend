import mongoose from 'mongoose';

const perennialTreeSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
    },
    forest_type:{
        type: String
    },
    acreageForest:{
        type: String
    }
})
const PerennialTree = mongoose.model('PerennialTree',perennialTreeSchema)

export default PerennialTree