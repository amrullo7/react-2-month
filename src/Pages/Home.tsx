import { Button } from "@/components/ui/button"
import { addatom, deletetom, editatom, TodoAtom } from "@/store/atomtodo"
import { useZStodo } from "@/store/austodo"
import { addred, deletered, editred } from "@/store/counter"
import { store } from "@/store/store"
import { useAtomValue, useSetAtom } from "jotai"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Home = () => {
  const [elem,setElem]=useState({})
  const[search,setSearch]=useState("")
  const dispatch=useDispatch()
  const data=useAtomValue(TodoAtom)
  const deleteUSer=useSetAtom(deletetom)
  const addtom=useSetAtom(addatom)
  let edatom=useSetAtom(editatom)
  let eddzs=useZStodo((store)=>store.editzs)
  const data1=useZStodo((state)=>state.data)
  let deletezus=useZStodo((state)=>state.deletezs)
  let addzus=useZStodo((state)=>state.addzs)
  const data2=useSelector((store)=>store.counter.data)
  let dt=[]
  for(let el of data){
    let obj={}
 for(let ell of data1){
  for(let elll of data2){
    if(el.id==ell.id && ell.id==elll.id){
       obj={...el,...ell,...elll}
    }
  }
 }
 dt.push(obj)
  }
  function handleDelete(id:number) {
    deletezus(id)
    dispatch(deletered(id))
    deleteUSer(id)
  }
  function handleAdd(e:any) {
    e.preventDefault()
    let newUserzs={
      id:elem.id?elem.id:Date.now(),
      age:e.target.age.value,
      status:e.target.select.value=="true"
    }
    let newUseratom={
      id:elem.id?elem.id:Date.now(),
      job:e.target.job.value
    }
    let newUserrd={
      id:elem.id?elem.id:Date.now(),
      name:e.target.name.value
    }
    if(elem.id){
      edatom(newUseratom)
eddzs(newUserzs)
dispatch(editred(newUserrd))
    }
    else{

addzus(newUserzs)
addtom(newUseratom)
dispatch(addred(newUserrd))
    }
console.log(data1);
console.log(data);

console.log(elem);
setElem({})
e.target.reset()

  }
  return (
    <div>
      Search: <br />
      <input placeholder="Search" type="text" value={search} name="" onChange={(e)=>setSearch(e.target.value)} id="" />
     
     <br />
     <br />
      <form action="" className="flex flex-col gap-2 w-[500px]" onSubmit={handleAdd} >
        <input type="text" defaultValue={elem.name} placeholder="Name" name="name" id="" />
        <input type="text" defaultValue={elem.age} placeholder="Age" name="age" id="" />
        <input type="text" defaultValue={elem.job} placeholder="Job" name="job" id="" />
           <select name="select" id="">
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
        <Button type="submit">Add</Button>
      </form>
      <Table className="w-[100%]">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Name</TableHead>
      <TableHead>Job</TableHead>
      <TableHead>Age</TableHead>
      <TableHead >Status</TableHead>
      <TableHead >Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {dt.filter((e)=>e.name.toLowerCase().trim().includes(search.toLowerCase().trim())).map((el)=>{
  return <TableRow key={el.id}>
    <TableCell>{el.name}</TableCell>
    <TableCell>{el.job}</TableCell>
    <TableCell>{el.age}</TableCell>
    <TableCell>{el.status?"Active":"Inactive"}</TableCell>
    <TableCell>
    <Button className="bg-red-500" onClick={()=>handleDelete(el.id)} >Delete</Button>
    <Button className="bg-green-500" onClick={()=>setElem(el)} >Edit</Button>

    </TableCell>
    
  </TableRow>
})}
  </TableBody>
</Table>

    </div>
  )
}

export default Home