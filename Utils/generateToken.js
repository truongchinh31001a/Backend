import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
    return token
}
const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
        // Kiểm tra xem token có đúng định dạng không (Bearer token)
        if (!token.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid token format. It should be in the format "Bearer <token>".' });
        // Lấy phần token sau chuỗi 'Bearer '
        const authToken = token.split(' ')[1];
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(401).json({ message: 'Access denied. User not found.' });
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500)
        throw new Error('Internal server error');
    }
}
export { generateToken, verifyToken }