import { addUser, decrement, deleteUser, editUser, increment } from '@/store/counter'
import type { AppStore, RootState } from '@/store/store'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const [elem,setElem]=useState({name:"",email:"",age:null,status:"true",id:null})
  const {value}=useSelector((store:RootState)=>store.counter)
  const {data}=useSelector((store:RootState)=>store.counter)
  const dispatch=useDispatch()
  function handleSubmit(e:any) {
    e.preventDefault()
    let newUser={
      id:elem.id?elem.id:Date.now(),
      name:e.target.name.value,
      email:e.target.email.value,
      age:e.target.age.value,
      status:e.target.select.value=="true"
    }
   
  elem.id? dispatch(editUser(newUser)):  dispatch(addUser(newUser))
    e.target.reset()

setElem({name:"",email:"",age:null,status:"true",id:null})
  }
  function handleEdit(e:any) {
    setElem(e)
  }
  return (


    <div>
      {value}
      
      <button className='cursor-pointer' onClick={()=>dispatch(increment())}>+</button>
      <button className='cursor-pointer' onClick={()=>dispatch(decrement())}>-</button>
      <form action="" onSubmit={handleSubmit}>
        <input defaultValue={elem.name} type="text" name="name" id="" />
        <input defaultValue={elem.email} type="email" name="email" id="" />
        <input defaultValue={elem.age?elem.age:""} type="number" name="age" id="" />
        <select defaultValue={elem.status} name="select" id="">
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button type="submit">Add </button>
      </form>
      {data.map((e)=>{
        return <div>
          <h1>{e.name}</h1>
          <p>{e.email}</p>
          <p>{e.age}</p>
          <p >{e.status?"Active":"Inactive"}</p>
          <button onClick={()=>dispatch(deleteUser(e.id))}>Delete</button>
          <button onClick={()=>handleEdit(e)}>Edit</button>
        </div>
      })}
    </div>
  )
}

export default Home