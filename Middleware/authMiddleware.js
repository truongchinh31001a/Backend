import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const protect = (async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    // Kiểm tra xem token có đúng định dạng không (Bearer token)
    if (!token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid token format. It should be in the format "Bearer <token>".' });
    }
    // Lấy phần token sau chuỗi 'Bearer '
    const authToken = token.split(' ')[1];
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId)
    next()

  } catch (error) {
    res.status(500)
    throw new Error('Not authorized, invalid token')
  }

})

export { protect }