import User from "../Models/userModel.js";
import generateToken from '../Utils/generateToken.js'

const registerUser = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    // tìm địa chỉ ví và kiểm tra ví tồn tại
    const userExists = await User.findOne({ wallet_address: walletAddress });
    if (userExists) {
      return res.status(400).json({
        message: `User ${walletAddress} already exists`,
      });
    }
    // Tạo một tài khoản mới với địa chỉ ví và verifiedEmail: false
    const user = new User({
      wallet_address: walletAddress,
      verifiedEmail: false,
      required: true,
    });
    // Lưu tài khoản vào cơ sở dữ liệu
    const savedUser = await user.save();
    // Gọi hàm generateToken để tạo và ghi token vào cookie
    generateToken(res, savedUser._id);
    // Gửi phản hồi JSON chứa tài khoản mới
    res.status(200).json({ message: 'Đăng ký thành công', user: savedUser });
  }
  catch (error) {
    // console.log(error.message);
    res.status(500).json({ error });
  }
}

const loginUser = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await User.findOne({ wallet_address: walletAddress })
    if (user) {
      // Gọi hàm generateToken để tạo và ghi token vào cookie
      generateToken(res, user._id);
      // kiểm tra email chưa xác thực
      if (!user.verifiedEmail) {
        return res.status(200).json({
          message: "Đăng nhập thành công",
          verifiedEmail: user.verifiedEmail,
          emailStatus: "Tài khoản chưa được xác nhận email",
        });
      }
      return res.status(200).json({
        message: "Đăng nhập thành công",
        verifiedEmail: user.verifiedEmail,
      });
    } else {
      res.status(401).json({ error: "Đăng nhập không thành công" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { loginUser, registerUser };
