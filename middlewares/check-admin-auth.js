const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Administrator');
    if(!authHeader) {
        const error = new Error('Sorry! Not a Administrator.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'ADMIN_SECRET');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('Administrator Error!');
        error.statusCode = 401;
        throw error;
    }
    req.adminId = decodedToken._id;
    next();
}