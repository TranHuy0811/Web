const verifyRoles=(...allowedRoles)=>{ 
    return (req,res,next)=>{
        
        if(!req?.roles) return res.sendStatus(401)
        
        const rolesArray =[...allowedRoles];

        const map=new Map()
        let result=false;
        for(let i=0;i<=req.roles.length-1;i++) map.set(req.roles[i],1)
        for(let i=0;i<=rolesArray.length-1;i++)
        {
            if(map.has(rolesArray[i]))
            {
                result=true;
                break;
            }
        }
        // const result= req.roles.map(role=>rolesArray.includes(role)).find(val=>val===true)

        if(!result) return res.sendStatus(401) 
        next()
    }
}
module.exports=verifyRoles