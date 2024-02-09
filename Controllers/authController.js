import User from "../Models/userModel.js";
import generateToken from '../Utils/generateToken.js'
import Web3 from 'web3'

const getLoginMessage = async (req, res) => {
  try {
    const { address } = req.body;
    // kiểm tra người dùng tồn tại?
    let user = await User.findOne({ wallet_address: address }).maxTimeMS(15000);;
    let nonce;
    if (!user || !user.nonce) {
      // Tạo số ngẫu nhiên (nonce)
      nonce = Math.floor(Math.random() * 1000000);
      if (!user) {
        // Người dùng không tồn tại, tạo người dùng mới
        user = new User({ wallet_address: address, nonce });
      } else {
        // Người dùng tồn tại nhưng không có số nonce, cập nhật số nonce cho người dùng
        user.nonce = nonce;
      }
      // Lưu người dùng vào cơ sở dữ liệu
      await user.save();
    } else {
      // Người dùng đã tồn tại, lấy số nonce hiện có
      nonce = user.nonce;
    }
    // Trả về thông điệp đăng nhập cho frontend
    res.json({ message: `Wellcome to XYZ, please sign this message to authen ${nonce}` });
  }
  catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
}

const loginUser = async (req, res) => {
  try {
    const { address, sign } = req.body;
    // if (!address || !sign) {
    //   return res.status(400).json({ message: 'Địa chỉ ví và chữ ký là bắt buộc' });
    // }
    const user = await User.findOne({ wallet_address: address }).maxTimeMS(20000)
    // console.log('User:', user);
    // Kiểm tra nếu người dùng không tồn tại hoặc không có số nonce
    if (!user || !user.nonce) {
      return res.status(404).json({ message: 'Người dùng không tồn tại hoặc không có số nonce' });
    }
    // Kiểm tra chữ ký bằng cách sử dụng thư viện Web3 và địa chỉ ví
    // const web3 = new Web3();
    // const recoveredAddress = web3.eth.accounts.recover(sign);

    // // Kiểm tra xem chữ ký có hợp lệ hay không
    // if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    //   return res.status(401).json({ message: 'Chữ ký không hợp lệ' });
    // }

    // Tạo mã token
    const token = generateToken(res, user._id);
    await user.save();

    // Gửi mã token cho frontend
    res.json({ token });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
};
export { loginUser, getLoginMessage };