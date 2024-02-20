import Otp from "../Models/otpModel.js";
import User from "../Models/userModel.js";
import { generateOTP, sendOTP, verifyOTP } from "../Utils/generateOTP.js";

//Send Email and Verify code
const sendEmailOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const userId = req.user._id;
        //save email user
        await User.findByIdAndUpdate(userId, { email: email });
        //generate Otp
        const otp = generateOTP();
        // save  OTP  in  the database
        const otpData = new Otp({
            userId: userId,
            code: otp,
            createTime: new Date(),
            expiredTime: new Date(Date.now() + 5 * 60 * 1000), // Set OTP expiration time to 5 minutes from now
        });
        await otpData.save();
        // Send OTP  via email
        await sendOTP(email, otp);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.log("Error sending email OTP:", error.message);
        res.status(500).json({ error: "Failed to send email OTP" });
    }
};

// Get
const getAllUser = async (req, res) => {
    try {
        const userId = req.user._id; // Lấy ID người dùng từ middleware protect
        const user = await User.findById(userId).select(
            "wallet_address full_name id_card birthday hometown permanent_address idCard_front_url idCard_back_url email verifiedStatus"
        );
        if (user) {
            const {
                wallet_address,
                full_name,
                id_card,
                birthday,
                hometown,
                permanent_address,
                idCard_front_url,
                idCard_back_url,
                email,
                verifiedStatus,
            } = user;
            res
                .status(200)
                .json({
                    wallet_address,
                    full_name,
                    id_card,
                    birthday,
                    hometown,
                    permanent_address,
                    idCard_front_url,
                    idCard_back_url,
                    email,
                    verifiedStatus,
                });
        } else {
            res.status(404).json({ message: "Không tìm thấy người dùng." });
        }
    } catch (error) {
        console.log("Error while get user information:", error.message);
        res.status(500).json({ error: "Error while get user information" });
    }
};

//Put : User account  KYC
const putUserKYC = async (req, res) => {
    try {
        const {
            full_name,
            id_card,
            birthday,
            hometown,
            permanent_address,
            idCard_front_url,
            idCard_back_url,
            otp,
        } = req.body;
        const userId = req.user._id;

        // verify OTP
        const isOTPValid = await verifyOTP(userId, otp);
        if (!isOTPValid) {
            return res.status(400).json({ message: 'Invalid OTP', showSubmitKYCButton: false });
        }else{
            await User.findByIdAndUpdate(userId, {
                full_name: full_name,
                id_card: id_card,
                birthday: birthday,
                hometown: hometown,
                permanent_address: permanent_address,
                idCard_front_url: idCard_front_url,
                idCard_back_url: idCard_back_url,
                verifiedStatus: 'submitted KYC',
            });
    
            // Kiểm tra xem email đã được xác minh hay chưa
            const user = await User.findById(userId);
            const emailVerified = user.emailVerified;
    
            res.status(200).json({ message: "User KYC submitted successfully", showSubmitKYCButton: true, emailVerified: emailVerified });
        }
    } catch (error) {
        console.log('failed userKYC', error);
        res.status(500).json({ message: 'An error occurred while processing User KYC', showSubmitKYCButton: false });
    }
};

export { sendEmailOTP, getAllUser, putUserKYC };