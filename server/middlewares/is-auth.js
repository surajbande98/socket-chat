const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        throwError();
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, "somesupersecretkey");
    } catch (err) {
        err.statusCode = 401;
        err.message = 'SESSION_EXPIRED';
        throw err;
    }

    if (!decodedToken) {
        throwError();
    }

    //Valid token
    console.log('Decoded token', decodedToken);
    req.userId = decodedToken.userId;
    next();
};

const throwError = () => {
    const error = new Error("Not authenticated");

    error.statusCode = 401;
    
    throw error;
};