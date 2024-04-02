const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//authorization, check if it valid
//check the token if it is valid
// check for the user

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "Authroization token is required"})
    }

    const token = authorization.split(' ')[1]
    console.log("Received Token:", token);

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth;