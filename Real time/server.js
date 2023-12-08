const {createServer}=require('http')
const {Server}=require('socket.io')
const {format}=require('date-fns')
const httpServer=createServer()
const PORT=4250

const io=new Server(httpServer,{
    cors:{
        origin:[`http://localhost:${PORT}`,`http://127.0.0.1:5500`]
    }
})
io.on("connection",(socket)=>{
    socket.on("date_time",()=>{
        io.emit('date_time',format(new Date(),'dd/MM/yyyy\tHH:mm:ss'))
    })
})

httpServer.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`)
})