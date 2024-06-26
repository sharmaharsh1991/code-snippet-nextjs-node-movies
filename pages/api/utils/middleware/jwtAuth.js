import jwt from 'jsonwebtoken';
export default function authMiddleware(handler) {
  return async (req, res) => {
    
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }
    try {
     
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      return await handler(req, res);
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
  };
}

