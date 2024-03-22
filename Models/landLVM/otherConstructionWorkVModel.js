import mongoose from 'mongoose';

const otherContructionWorkSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
    },
    type_of_construction:{
        type: String
    },
    project_category:{
        type: String
    },
    construction_area:{
        type: Number
    },
    floor_area:{
        type: Number
    },
    
    ownership_period:{
        type: String
    }
})
const OtherConstructionWork = mongoose.model('OtherContructionWork',otherContructionWorkSchema)

export default OtherConstructionWork