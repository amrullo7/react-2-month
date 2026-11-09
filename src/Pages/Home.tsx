import { useTodo } from "@/store/todo"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { cntatom } from "@/store/atomtodo"

const Home = () => {
  let {data,getData,addUser}=useTodo()
  let [cnt,setcnt]=useAtom(cntatom)
  let [add,setAdd]=useState(false)
  function handleAdd(e:any) {
    e.preventDefault()
    let newUser=new FormData()
    newUser.append("name",e.target.name.value),
    newUser.append("description",e.target.desc.value)
    for(let el of e.target.photo.files){
     newUser.append("images",el)
    }
    addUser(newUser)
            
 
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
      {cnt}
      <button onClick={()=>setcnt(cnt+1)}>+</button>
      <button onClick={()=>setcnt(0)}>reset</button>

 <Dialog open={add}>
  <DialogTrigger>
    <Button onClick={()=>setAdd(true)}>

   + Add User
    </Button>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
     
    </DialogHeader>
    <form action="" onSubmit={handleAdd}>
      <input type="text" name="name" id="" />
      <input type="text" name="desc" id="" />
      <input type="file" multiple name="photo" id="" />
      <button type="submit" onClick={()=>setAdd(false)}>Submit</button>
    </form>
  </DialogContent>
</Dialog>



      <Table className="w-[100%]">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Id</TableHead>
      <TableHead>Avatar</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Desc</TableHead>
      <TableHead > Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
     {data.map((el)=>{
        return  <TableRow key={el.id}>
          <TableCell>{el.id}</TableCell>
          <TableCell>{el.name}</TableCell>
          <TableCell>{el.description}</TableCell>
          <TableCell>
          <Button className="bg-red-700">Delete</Button>

          </TableCell>
        </TableRow>
      })}
  </TableBody>
</Table>
     
    </div>
  )
}

export default Home