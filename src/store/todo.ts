import { create } from 'zustand'
import axios from "axios"
interface IImage{
    id:number,
    imageName:string
}
interface IData{
    id:number,
    isCompleted:boolean,
    images:IImage[],
    name:string,
    description:string


}
interface Todo{
    data:IData[];
    getData:()=>void;
    deleteUser:(id:number)=>void,
    addUser:(user:FormData)=>void,

}
let api="https://to-dos-api.softclub.tj/api/to-dos"
export const useTodo=create<Todo>((set,get)=>({
    data:[],
    getData:async()=>{
        try {
            let {data}=await axios.get(api)
            set({data:data.data})
            console.log(data.data);
            
        } catch (error) {
            console.error(error);
            
        }
    },
    deleteUser:async(id)=>{
        try {
            await axios.delete(api+"?id="+id)
            get().getData()
        } catch (error) {
            console.error(error);
            
        }
    },
    addUser:async(user)=>{
try {
    await axios.post(api,user)
    get().getData()
} catch (error) {
    console.error(error);
    
}
    }

}))