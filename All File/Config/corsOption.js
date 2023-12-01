const AllowedOrigin=require('./allowedOrigins')
const corsOptions={
    origin: (org,callback) =>{
        if(AllowedOrigin.indexOf(org) !== -1|| !org){
            callback(null,true)
        }
        else { 
            callback(new Error('Not allowed by CORS'))
        } 
    },
    optionSuccessStatus: 200 
}
module.exports=corsOptions;