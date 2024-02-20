const jsonwebtoken=require('jsonwebtoken')

//token verification middleware function
const verifyToken=(req,res,next)=>{

    //get bearer token string
    const bearerToken=req.headers.authorization //Bearer token
    if(!bearerToken){
        return res.send({message:"Unauthorized request"})
    }
    //extract only the token from beare token
    const token=bearerToken.split(' ')[1]
    try{
    //verify token by decoding using same secret key
    let decodedToken=jsonwebtoken.verify(token,'abcdef')
        next()
    }catch(err){
        next(err)
    }

}


module.exports=verifyToken;