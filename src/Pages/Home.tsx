import React, { useState } from 'react'

const Home = () => {
  let [elem,setElem]=useState({})
  let [data,setData]=useState([
    {name:"Abdullo",id:1,job:"Student",status:true},
    {name:"Muhammad",id:2,job:"Teachet",status:false},
    {name:"Qurbon",id:3,job:"Singer",status:true},

  ]
)
function handleDelete(id:number) {
setData((prev)=>prev.filter((e)=>e.id!=id))
}
function handleAdd(e:any) {
  e.preventDefault()
  let newUser={
    name:e.target.name.value,
    job:e.target.job.value,
    id:elem.id?elem.id:Date.now(),
    status:e.target.select.value
  }
  if(elem.id){
  setData((prev)=>prev.map((e)=>e.id==elem.id?newUser:e))

  }
  else{

    setData((prev)=>[...prev,newUser])
  }
  e.target.reset()
  setElem({})
}
  return (
    <div>
      <form action="" onSubmit={handleAdd}>
        <input type="text" defaultValue={elem.name} name="name" placeholder='Name' id="" />
        <input type="text" defaultValue={elem.job} name="job" placeholder='Job' id="" />
         <select name="select" id="">
          <option value="true">Active</option>
           <option value="false">Inactive</option>
         </select>
         <button type="submit">ADD</button>
      </form>
      {data.map((e)=>{
        return <div key={e.id}>
          <h1>{e.name}</h1>
          <p>{e.job}</p>
          <p>{e.status?"Active":"Inactive"}</p>
             <button onClick={()=>handleDelete(e.id)}>Delete</button>
               <button onClick={()=>setElem(e)}>Edit</button>
        </div>
      })}

    </div>
  )
}

export default Home