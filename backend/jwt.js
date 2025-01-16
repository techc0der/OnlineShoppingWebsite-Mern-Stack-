const jwt = require('jsonwebtoken');
require('dotenv').config();
const seller = require('./Models/sellerSchema');
const user = require('./Models/userSchema')

const verifyToken = async(req,res,next)=>{
    const authorization = req.headers.authorization;
    //console.log(authorization)
    const token = authorization.split(' ')[1];
    //console.log(token);
    if (!token) res.status(400).json({ error: "Unauthorized" });
    try {
        const response = await jwt.verify(token,process.env.tokenKey);
        if(response){
            //console.log(response);
            req.user = response; 
        }
        const id = req.user
        const responseUser = await user.findOne({username:id.username});
        //console.log(responseUser);
        console.log('hii')
        if(!responseUser) {
            const responseSeller = await seller.findOne({username:id.username});
            if(!responseSeller){
                res.status(400).json({msg:'user not found'})
            }
            else{
                next()
            }
        }
        else if(responseUser) {
            //res.status(200).json({msg:'user is found'})
            next()
        }
    } catch (error) {
        res.status(500).json({error:error}); 
    } 
}

const verifyToken1 = async (req, res, next) => {
    const authorization = req.headers.authorization;
    //console.log(authorization)
    const token = authorization.split(' ')[1];
    console.log(token);
    if (!token) res.status(400).json({ error: "Unauthorized" });
    try {
        const response = await jwt.verify(token,process.env.tokenKey);
        if(response){
            //console.log(response);
            req.user = response; 
        }
        const id = req.user
        const responseUser = await user.findOne({username:id.username});
        //console.log(responseUser);
        console.log('hii')
        if(!responseUser) {
            const responseSeller = await seller.findOne({username:id.username});
            if(!responseSeller){
                res.status(400).json({msg:'user not found'})
            }
            else{
                res.status(200).json({msg:'seller is found'})
                next()
            }
        }
        else if(responseUser) {
            res.status(200).json({msg:'user is found'})
            next()
        }
    } catch (error) {
        res.status(500).json({error:error}); 
    } 
} 
const GenerateToken = async (user)=>{
    const token  = await jwt.sign(user,process.env.tokenKey);
    
    return token;
}
module.exports = {verifyToken,GenerateToken,verifyToken1};
