const jwt = require('jsonwebtoken');

//middleware for checking jwt tokens
module.exports = (req, res, next) => {
    const token = req.header('token');

    //check if the token is present in the headers
    if(!token){
        return res.json({msg: 'No token'});
    }

    try {
        //extract username from the decoded token
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.user;
        next();
    }catch(err){
        res.json({msg: 'Your session has expired or you aren\'t logged in'});
    }
};