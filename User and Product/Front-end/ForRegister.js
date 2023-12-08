
document.addEventListener("readystatechange",(event)=>{
    initApp();
})
function initApp()
{
    const button=document.querySelector("button")
    button.addEventListener("click",(event)=>{
        
        const username=document.querySelector(".user").value
        const password=document.querySelector(".pass").value
        const obj={
            user:username,
            pwd:password
        }
        Register(obj)
    })
    
    const Register=async(obj)=>{
        const response=await fetch(`http://localhost:4200/auth`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials:'include',
            body:JSON.stringify(obj)
        })
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    }
}


