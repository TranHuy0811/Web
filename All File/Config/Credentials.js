const AllowedOrigin=require('./allowedOrigins')

const credentials= (req,res,next)=>{
    const origin=req.header.origin
    if(AllowedOrigin.includes(origin)){
        res.header('Access-Control-Allow-Credentials',true)
    }
    next()
}

module.exports=credentials