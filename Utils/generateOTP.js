import nodemailer from 'nodemailer'
import Otp from '../Models/otpModel.js'
import User from '../Models/userModel.js';

const generateOTP = () => {
    const length = 6;
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Chọn ngẫu nhiên một chữ số từ 0 đến 9
    }
    return otp;
}
/// Tạo transporter cho Nodemailer và tạo OTP
const sendOTP = async (email, otp) => {
    try {
        // console.log(process.env.YOUR_EMAIL_USER,process.env.YOUR_EMAIL_PASSWORD)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: "gmail",
            auth: {
                user: process.env.YOUR_EMAIL_USER,
                pass: process.env.YOUR_EMAIL_PASSWORD
            },
        });
        // Tạo email
        const mailOptions = {
            from: process.env.YOUR_EMAIL_USER,
            to: email,
            subject: 'Xác nhận địa chỉ ví',
            text: `Mã OTP của bạn là: ${otp}`,
        };
        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Email xác nhận đã được gửi.');
    } catch (error) {
        console.log('Lỗi khi xác minh OTP:', error);
        throw new Error( 'Lỗi khi gửi email xác nhận' );
    }
};

//hàm xác minh otp và đặt verifiedEmail: true
const verifyOTP = async (userId, otp) => {
    try {
        // tìm mã otp theo userID
        const otpData = await Otp.findOne({ userId, code: otp })
        if (!otpData) {
            throw new Error('Mã OTP không hợp lệ.');
        }
        // kiểm tra thời gian hết hạn 
        const currentTime = new Date();
        if (otpData.expiredTime < currentTime) {
            throw new Error('Mã OTP đã hết hạn.');
        }
        // xác minh thành công và đánh dấu địa chỉ ví là đã xác nhận
        await User.findByIdAndUpdate(userId, { verifiedEmail: true });
        // Xoá OTP đã xác minh khỏi cơ sở dữ liệu
        await Otp.findByIdAndDelete(otpData._id);
        console.log('OTP đã được xác minh và địa chỉ ví đã được đánh dấu là đã xác nhận.');
        return true;
    } catch (error) {
        console.log('Lỗi khi xác minh OTP:', error);
        throw new Error( 'Lỗi khi xác minh OTP' );
    }
}



export {generateOTP, sendOTP, verifyOTP }