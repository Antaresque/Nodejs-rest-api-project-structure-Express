const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.protect = async (req, res, next) => {
    try {
        // 1) Check if the token is there
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
            token = req.headers.authorization.split(" ")[1];
        
        if(!token)
            return next( new AppError(401, "fail", "You are not logged in! Please login in to continue"), req, res, next);

        // 2) Verify token
        jwt.verify(token, process.env.PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
            if(err)
                return next(new AppError(401, "fail", "Error while verifying token"), req, res, next);
            
            req.payload = payload;

            if(req.payload.role === undefined)
                return next(new AppError(401, "fail", "Error while verifying token"), req, res, next);

            next();
        });
    }
    catch (err) { next(err) }
};
  
// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.payload.role)) 
            return next(new AppError(403, "fail", "You are not allowed to do this action"), req, res, next);
        
        next();
    };
};