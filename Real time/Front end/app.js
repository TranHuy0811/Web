const socket=io("ws://localhost:4250")
socket.emit('date_time')
setInterval(()=>{
    socket.emit('date_time')
},1000)
socket.on('date_time',(data)=>{
    document.querySelector("h1").textContent=data
})

