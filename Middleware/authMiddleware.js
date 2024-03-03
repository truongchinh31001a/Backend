import { verifyToken } from '../Utils/generateToken.js'


const protect = async (req, res, next) => {
  try {
    await verifyToken(req, res, next);
  } catch (error) {
    res.status(500)
    throw new Error('Not authorized, invalid token')
  }
}

const authNotary = (async (req, res, next) => {
  try {
    await verifyToken(req, res, next);
    const user = req.user;
    // Kiểm tra xem người dùng có vai trò là Notary hay không
    if (!user.roles.includes('notary')) {
      return res.status(403).json({ message: 'Access denied. Not a Notary.' });
    }
    next();
  } catch (error) {
    res.status(500)
    throw new Error('Not authorized, invalid token and not notary');
  }
})

export { protect, authNotary }