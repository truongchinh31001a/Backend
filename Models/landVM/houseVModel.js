import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
        required : true
    },
    constructionArea:{
        type: Double
    },
    floorArea:{
        type: Double
    },
    lever:{
        type: Int
    },
    structure:{
        type: String
    },
    floorsOfNumber:{
        type: Int
    },
    ownership_period:{
        type: String
    },
    year_complete_construction:{
        type: Date
    },
})
const House = mongoose.model('House',houseSchema)

export default House