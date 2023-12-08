const express=require('express')
const router=express.Router()
const ROLES_LIST=require('../Config/Roles_List')
const verifyRoles=require('../Config/VerifyRoles')
const ProductsDB=require('../DB Data/Products')

router.route('/')
    .get(async(req,res)=>{
        const products=await ProductsDB.find()
        if(!products) return res.sendStatus(204).json({"message":"No Product Found."})
        res.json({products})
    })
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),async(req,res)=>{
        if(!req?.body?.name||!req?.body?.quantity||!req?.body?.price) {
            return res.sendStatus(400).json({'message':'Name,Quantity and Price are required !'})
        }
        try{
            const result=await ProductsDB.create({
                name:req.body.name,
                quantity:req.body.quantity,
                price:req.body.price
            })
            res.status(201).json(result)
        }
        catch(err){res.status(500).json({'message':'Internal Server Error'})}
    })
    .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),async(req,res)=>{
        if(!req?.body?.id) return res.status(400).json({"message":"ID is required !"})
        try{
            const product=await ProductsDB.findOne({_id:req.body.id}).exec()
            if(!product) return res.status(204).json({"message":"No Product matches this ID"})

            if(req.body.name) product.name=req.body.name
            if(req.body.quantity) product.quantity=req.body.quantity
            if(req.body.price) product.price=req.body.price

            const result=await product.save()
            res.json(result)
        }
        catch(err){res.status(500).json({"message":"No Product matches this ID" })}
    })
    .delete(verifyRoles(ROLES_LIST.Admin),async(req,res)=>{
        if(!req?.body?.id) return res.status(400).json({"message":"ID is required !"})
        try{
            const product=await ProductsDB.findOne({_id:req.body.id}).exec()
            if(!product) return res.status(204).json({"message":"No Product matches this ID"})

            const result=await product.deleteOne({_id:req.body.id})
            res.json(result)
        }
        catch(err){res.status(500).json({"message":"No Product matches this ID" })}
    })

router.route('/:id')
    .get(async(req,res)=>{

        if(!req?.params?.id) return res.status(400).json({"message":"No ID matches !"})
        try{
            const product=await ProductsDB.findOne({_id:req.params.id}).exec()
            if(!product) return res.status(204).json({"message":"No Product matches this ID"})

            res.json(product)
        }
        catch(err){res.status(500).json({"message":"No Product matches this ID" })}
    })

router.route('/search/:value')
    .get(async(req,res)=>{
        const regex=new RegExp(`^${req.params.value}`, 'gi')
        const products=await ProductsDB.find({name:{$regex:regex}})
        if(!products) return res.sendStatus(204).json({"message":"No Product Found."})
        res.json({products})
    })


module.exports=router