import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const protect = (async (req, res, next) => {
    let token
      token = req.header('Authorization');
      if(token) {
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId)
            next()
        }catch(error){
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
      }else{
        res.status(401)
        throw new Error('Not authorized, no token')
      }
})
// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//       // Verify the token using the secret key
//       const decoded = jwt.verify(token, secretKey);
//       req.user = decoded; // Attach the decoded user information to the request object
//       next();
//   } catch (error) {
//       return res.status(403).json({ message: 'Invalid token.' });
//   }
// };

export  {protect}