import { Button } from "@/components/ui/button"
import { addUser, deleteUser, editUser} from "@/store/counter"
import {  type AppStore, type RootState } from "@/store/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const [elem,setElem]=useState({id:null,name:"",job:"",age:null})
  const dispatch=useDispatch()
 const {data} = useSelector((store:RootState)=>store.counter)
 function handleSubmit(e:any) {
  e.preventDefault()
  let newUser={
    name:e.target.name.value,
    job:e.target.job.value,
    age:e.target.age.value,
    id:elem.id?elem.id:Date.now()
  }
  if(elem.id){
    dispatch(editUser(newUser))
  }
  else{
    dispatch(addUser(newUser))
  }

  e.target.reset()
  setElem({id:null,name:"",job:"",age:null})
 }
 function handleEdit(e:any) {
  setElem(e)
 }
 
  return (
    <div>
      <form action="" className="border rounded-[12px] gap-[10px] p-4 w-[500px] flex flex-col" onSubmit={handleSubmit}>
        <input className="w-[350px] border p-2 rounded-[8px] " placeholder="Name"   defaultValue={elem.name} type="text" name="name" id="" />
        <input className="w-[350px] border p-2 rounded-[8px] " placeholder="Age"  defaultValue={elem.age?elem.age:""} type="text" name="age" id="" />
        <input className="w-[350px] border p-2 rounded-[8px] " placeholder="job"  defaultValue={elem.job} type="text" name="job" id="" />
        <Button className="bg-blue-700 w-[350px] border p-2 rounded-[8px] " type="submit">{elem.id?"Save":"Add"}</Button>
      </form>
      <div className="grid grid-cols-3 gap-[15px] justify-center ">

      {data.map((el)=>{
        return <div className="flex-col w-[400px] gap-[15px] mx-auto border rounded-2xl  p-4 " key={el.id}>
          <h1>{el.name}</h1>
          <p>{el.job}</p>
          <p>{el.age}</p>
          <Button className="bg-red-600" onClick={()=>dispatch(deleteUser(el.id))}>Delete</Button>
          <Button className="bg-green-600" onClick={()=>handleEdit(el)}>Edit</Button>
        </div>
      })}
      </div>
    </div>
  )
}

export default Home