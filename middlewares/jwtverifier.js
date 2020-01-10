const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token){
        return res.status(401).send({message: 'Access-Denied!'});
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        //Add user object with verified token details/payload to the req and pass
        req.user = verified;
        next();
    }
    catch(error){
        console.error(error);
        res.status(400).send({message: 'Invalid token!'});
    }
}

module.exports = verifytoken;