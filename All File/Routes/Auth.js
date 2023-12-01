const express=require('express')
const router=express.Router()
const authController=require('../Controllers/AuthControllers')

router.post('/',authController.handleLogin)
module.exports=router