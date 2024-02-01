import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    is_read:{
        type: Boolean,
        required: true
    },
},{
    timestamps: true,
})

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;