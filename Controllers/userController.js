import Otp from "../Models/otpModel.js";
import { generateOTP, sendOTP, verifyOTP } from "../Utils/generateOTP.js";


//Send Email and Verify code
const sendEmailOTP = async (req, res) => {
    try {
        const { email } = req.body

        //generate Otp
        const otp = generateOTP()
        
        // save  OTP  in  the database
        const otpData = new Otp({
            userId: req.user._id,
            code: otp,
            createTime: new Date(),
            expiredTime: new Date(Date.now() + 5 * 60 * 1000), // Set OTP expiration time to 5 minutes from now
        })
        await otpData.save()

        // Send OTP  via email
        await sendOTP(email,otp)
        

        res.status(200).json({message: 'OTP sent successfully'})
    } catch (error) {
        console.log('Error sending email OTP:', error.message);
        res.status(500).json({ error: 'Failed to send email OTP' });

        
    }
}

const verifyEmailOTP =  async (req, res) => {
    try{
        const {otp} = req.body;

        //verify OTP
        await verifyOTP(req.user._id, otp)
        res.status(200).json({ message: 'Email OTP verified successfully' });
    }catch (error) {
      console.error('Error verifying email OTP:', error);
      res.status(500).json({ error: 'Failed to verify email OTP' });
    }
}

export {sendEmailOTP, verifyEmailOTP}