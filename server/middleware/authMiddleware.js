const jwt = require('jsonwebtoken');

module.exports.authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied!'});
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: 'Token is not valid!'});
            } else {
                req.user = decoded.user;
                next();
            }s
        })
    } catch (err) {
        console.log(err.message, 'Something is wrong with the auth middleware!');
        res.status(500).json({ message: 'Server Error!'});
    }
};