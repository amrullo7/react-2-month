let api="https://to-dos-api.softclub.tj/"
import axios from "axios"
export const getTodo=async()=>{
    try {
        let {data}=await axios.get(api+"api/to-dos")
        return data
    } catch (error) {
        console.error(error);
        
    }
}
export const deleteTodo=async(id)=>{
    try {
        await axios.delete(api+"api/to-dos?id="+id)
    } catch (error) {
        console.error(error);
        
    }
}
export const addTodo=async(user)=>{
    try {
        await axios.post(api+"api/to-dos",user)
    } catch (error) {
        console.error(error);
        
    }
}
export const editTodo=async(user)=>{
    try {
        await axios.put(api+"api/to-dos",user)
    } catch (error) {
        console.error(error);
        
    }
}
export const deleteimg=async(id:number)=>{
    try {
        await axios.delete("https://to-dos-api.softclub.tj/api/to-dos/images/"+id)
    } catch (error) {
        console.error(error);
        
    }
}
export const addimg = async (id: number, img: FormData) => {
  await axios.post(
    `https://to-dos-api.softclub.tj/api/to-dos/${id}/images`,
    img
  )
}