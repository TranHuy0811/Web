const {format}=require('date-fns')
const {v4:uuid}=require('uuid')
const path=require('path')
const fsPromises=require('fs').promises

async function Event(message) {
    let datetime=format(new Date(),'yy/MM/dd\tHH:mm:ss')
    let logItem=`${datetime} ${uuid()} - ${message}\n`
    await fsPromises.appendFile(path.join(__dirname,"logText.txt"),logItem)
}
const Logger=(req,res,next) => {
    Event(`${req.method}   ${req.headers.origin}   ${req.url}`)
    next();
}
module.exports={Event,Logger}