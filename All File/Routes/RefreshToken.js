const express=require('express')
const router=express.Router()
const refreshtokenController=require('../Controllers/RefreshTokenController')

router.get('/',refreshtokenController.handleRefreshToken)
module.exports=router