import axios from 'axios'
let api='https://to-dos-api.softclub.tj/'
async function getUser(e:any) {
    try {
        let {data}=await axios.get(api+"api/to-dos")
        return data
    } catch (error) {
        console.error(error);
        
    }
}
async function deleteUser(id:number) {
    try {
        await axios.delete(api+"api/to-dos?id="+id)
    } catch (error) {
        console.error(error);
        
    }
}
async function addUser(newuser:any) {
    try {
        await axios.post(api+"api/to-dos",newuser)
    } catch (error) {
        console.error(error);
        
    }
    
}
async function editUser(newuser:any) {
    try {
        await axios.put(api+"api/to-dos?id="+newuser.id,newuser)
    } catch (error) {
        console.error(error);
        
    }
    
}
export {  getUser, deleteUser,addUser,editUser}