const express=require('express')
const router=express.Router()
const logoutController=require('../Controllers/LogoutControllers')

router.get('/',logoutController.handleLogOut)
module.exports=router