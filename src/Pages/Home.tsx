import { addUser, deleteUser, editUser, getData } from '@/store/counter'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const {data,isLoading}=useSelector((store)=>store.counter)
  const [elem,setElem]=useState({name:"",id:null,phone:null,status:null,avatar:"",age:null})
  const dispatch=useDispatch()
  function handleAdd(e:any) {
    e.preventDefault()
    let newUser={
      name:e.target.name.value,
      age:e.target.age.value,
      phone:e.target.phone.value,
      status:e.target.select.value=="true",
      avatar:e.target.photo.value
    }
    dispatch(addUser(newUser))
    dispatch(getData())
    e.target.reset()
  }
  function handlEdit(e:any) {
    e.preventDefault()
    let newUser={
      
      name:e.target.name.value,
      age:e.target.age.value,
      phone:e.target.phone.value,
      status:e.target.select.value=="true",
      avatar:e.target.photo.value,
      id:elem.id
    }
    console.log(elem);
    dispatch(editUser(newUser))
    setElem({name:"",id:null,phone:null,status:null,avatar:"",age:null})
    
  }
 const handleDelete = async (id: number) => {
  await dispatch(deleteUser(id))
  dispatch(getData())
}
  useEffect(()=>{
    dispatch(getData())
  },[])
  if(isLoading){
    return <div>
      LOADING................ 
    </div>
  }
  return (
    <div>
      <form action="" onSubmit={handleAdd}>
        <input placeholder='Name' type="text" name="name" id="" />
        <input placeholder='Photo url' type="text" name="photo" id="" />
        <input placeholder='Phone number' type="number" name="phone" id="" />
        <input placeholder='Age' type="number" name="age" id="" />
        <select name="select" id="">
          <option value="true">
            <option value="false"></option>
          </option>
        </select>
        <button type="submit">Add</button>
      </form>
      {data.map((el:any)=>{
        return <div key={el.id}>
          <h1>
            {el.name}
          </h1>
          <p>{el.age}</p>
          <p>{el.phone}</p>
          <p>{el.status?"Active":"Inactive"}</p>
          <img src={el.avatar} alt="" />
          <button onClick={()=>handleDelete(el.id)}>Delete</button>
          <button onClick={()=>setElem(el)}>Edit</button>
        </div>
      })}
      <form action="" onSubmit={handlEdit} >
           <input defaultValue={elem.name} placeholder='Name' type="text" name="name" id="" />
        <input defaultValue={elem.avatar} placeholder='Photo url' type="text" name="photo" id="" />
        <input defaultValue={elem.phone} placeholder='Phone number' type="number" name="phone" id="" />
        <input defaultValue={elem.age} placeholder='Age' type="number" name="age" id="" />
        <select  name="select" id="">
          <option value="true">
            <option value="false"></option>
          </option>
        </select>
        <button type="submit">Edit</button>
      </form>
    </div>
  )
}

export default Home