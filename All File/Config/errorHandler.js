const {Event}=require('./logEvents')
const ErrorHandler =(err,req,res,next)=> { 
    Event(`${err.name}: ${err.message}`) 
    console.error(err.stack)
    res.staus(500).send(err.message)
}
module.exports=ErrorHandler