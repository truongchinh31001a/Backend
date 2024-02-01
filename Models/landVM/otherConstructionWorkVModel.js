import mongoose from 'mongoose';

const otherContructionWorkSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
        required : true
    },
    type_of_construction:{
        type: String
    },
    project_category:{
        type: String
    },
    construction_area:{
        type: Double
    },
    floor_area:{
        type: Double
    },
    
    ownership_period:{
        type: String
    }
})
const OtherConstructionWork = mongoose.model('OtherContructionWork',houseSchema)

export default OtherConstructionWork