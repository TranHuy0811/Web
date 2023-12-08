const path=require('path')
const express=require('express')
const app=express()
const cors=require('cors')

require('dotenv').config()

const PORT=process.env.PORT||4200

const corsOption=require('./Config/corsOption')
const {Logger}=require('./Config/logEvents')
const errorHandler=require('./Config/errorHandler')
const verifyJWT=require('./Config/VerifyJWT')
const credentials=require('./Config/Credentials')
const connectDB=require('./Config/DBConnect')
const ErrorHandler = require('./Config/errorHandler')

const cookieParser=require('cookie-parser')
const mongoose=require('mongoose')

connectDB()
app.use(Logger)
app.use(credentials)

app.use(cors(corsOption)); // Third party Middleware (CORS: Cross Origin Resource Sharing) (Import)

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cookieParser())

app.use('/register',require('./Routes/Register'))
app.use('/auth',require('./Routes/Auth'))
app.use('/refresh',require('./Routes/RefreshToken'))
app.use('/logout',require('./Routes/Logout'))

app.use(verifyJWT)
app.use('/products',require('./Rest API/ProductsAPI'))

app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,"File_for_NodejsTutorial chap 10 (Database)","views","404.html"))
    }
    else if(req.accepts('json')){
        res.json({error: "404 Not Found"})
    }
    else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(ErrorHandler)
mongoose.connection.once('open',()=>{

    console.log("Connected to MongoDB")
    app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`)
    })
})