import {getUser, deleteUser, addUser, editUser } from "@/api/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const Home = () => {
  let queryClient=useQueryClient()
  let [el,setEl]=useState({})
  const {data}=useQuery({
    queryKey:['todos'],
    queryFn:getUser
  })
  const deleteMutation=useMutation({
    mutationFn:deleteUser,
    onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            })
        }
  })
  const addmutation=useMutation({
    mutationFn:addUser,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['todos']
      })
    }
  })
  const editmutation=useMutation({
    mutationFn:editUser,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['todos']
      })
    }
  })
    function handleDelete(id:number) {
    deleteMutation.mutate(id)
  }
  function handleAdd(e:any) {
    e.preventDefault()
let newUser=new FormData()
newUser.append("name",e.target.name.value)
newUser.append("description",e.target.desc.value)
for(let el of e.target.photo.files){
  newUser.append("images",el)
}
addmutation.mutate(newUser)
e.target.reset()
  }
  function handleEdit(e:any) {
    e.preventDefault()
    let updateUser={
      id:el.id,
      name:e.target.name.value,
      description:e.target.desc.value
    }
    editmutation.mutate(updateUser)
    e.target.reset()
    setEl({})

  }
  
  return (
    <div>
      <form action="" onSubmit={handleAdd}>
        <input  type="text" name="name" id="" />
        <input  type="text" name="desc" id="" />
        <input type="file" multiple name="photo" id="" />
   <button type="submit">Add User</button>
      </form>
      <form action="" onSubmit={handleEdit}>
        <input type="text" defaultValue={el?.name}  name="name" id="" />
        <input type="text" defaultValue={el?.description} name="desc" id="" />
        <button type="submit">Edit</button>
      </form>
{data?.data.map((e)=>{
  return <div>
    <h1>{e.name}</h1>
    <button onClick={()=>handleDelete(e.id)}>Delete</button>
    <button onClick={()=>setEl(e)}>edit</button>
  </div>
})}
    </div>
  )
}

export default Home