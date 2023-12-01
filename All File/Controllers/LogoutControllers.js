const jwt=require('jsonwebtoken')
const UserDB=require('../DB Data/Users')

const handleLogOut=async(req,res)=>{
    const cookie=req.cookies
    if(!cookie?.jwt) return res.sendStatus(204)
    const refreshToken=cookie.jwt
    const foundUser=await UserDB.findOne({refreshToken:refreshToken}).exec()
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:True}) 
        return res.sendStatus(204)
    }
    foundUser.refreshToken=""
    await foundUser.save()
    res.clearCookie('jwt',{httpOnly:true, sameSite:'None'}) 
    res.sendStatus(204)
}
module.exports={handleLogOut}