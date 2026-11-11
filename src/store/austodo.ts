import { create } from "zustand"

interface Zdata{
id:number,
age:number,
status:boolean
}
interface Todozs{
    data:Zdata[
    
    ],
    deletezs:(id:number)=>void
    addzs:(user:Zdata)=>void
    editzs:(user:any)=>void
}
export  const useZStodo=create<Todozs>((set)=>({
    data:[
            {
            id:1,
            age:16,
            status:true

        },
        {
            id:2,
            age:18,
            status:false
        },{
            id:3,
            age:20,
            status:true
        }
    ],
    deletezs:(id)=>set((state)=>({data:state.data.filter((el)=>el.id!=id)})),
    addzs:(user)=>set((state)=>({data:[...state.data,user]})),
    editzs:(user)=>set((state)=>({data:state.data.map((el)=>el.id==user.id?user:el)}))
    
    
}))