import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    landLicenceId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'LandLicense',
    },
    note:{
        type: String
    }
})
const Notice = mongoose.model('Notice',noticeSchema)

export default Notice