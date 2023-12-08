const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const UserDB=require('../DB Data/Users')

const handleLogin = async(req,res)=>{
    const {user,pwd}=req.body;
    if(!user||!pwd) return res.status(400).json({'message':'Username and Password are required'})

    const foundUser=await UserDB.findOne({username:user}).exec()
    if(!foundUser) return res.sendStatus(401)

    const match=await bcrypt.compare(pwd,foundUser.password)
    if(match) {
        const roles=Object.values(foundUser.roles)
        const accessToken=jwt.sign(
            {
                "UserInfo":{
                    "username":foundUser.username,
                    "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '20m'}
        )
        const refreshToken=jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        foundUser.refreshToken=refreshToken
        const result= await foundUser.save()

        res.cookie('jwt',refreshToken,{httpOnly:true, sameSite: 'None' , maxAge:24*60*60*1000})
        res.json({accessToken})
    }
    else return res.sendStatus(401);
}
module.exports={handleLogin}
