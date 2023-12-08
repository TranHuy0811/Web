const bcrypt=require('bcrypt')
const UserDB=require('../DB Data/Users')

const handleNewUser= async(req,res)=>{
    const {user,pwd}=req.body
    if(!user||!pwd) return res.status(400).json({'message':'Username and Password are required'})
    
    const duplicate=await UserDB.findOne({username:user}).exec()
    if(duplicate) return res.sendStatus(409)
    try{
        const hashPwd=await bcrypt.hash(pwd,10)
        const result=await UserDB.create({
            username:user,
            password:hashPwd
        })
        res.status(201).json({"success":`New user ${user} created!`}) 
    }
    catch(err){res.status(500).json({'message':err.message})}
}
module.exports={handleNewUser}