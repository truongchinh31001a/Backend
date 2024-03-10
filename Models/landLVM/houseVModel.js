import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
    },
    constructionArea:{
        type: Number
    },
    floorArea:{
        type: Number
    },
    lever:{
        type: Number
    },
    structure:{
        type: String
    },
    floorsOfNumber:{
        type: Number
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