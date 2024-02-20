import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
    note:{
        type: String
    }
})
const Notice = mongoose.model('Notice',noticeSchema)

export default Notice