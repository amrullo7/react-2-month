
import { addimg, addTodo, deleteimg, deleteTodo, editTodo, getTodo } from '@/api/api'
import { queryClient } from '@/lib/queryclient'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Home = () => {
  const [elem,setElem]=useState(null)
  const [add,setadd]=useState(0)

  const {data}=useQuery({
    queryKey:["todos"],
    queryFn:getTodo
  })

  const deleteMutation=useMutation({
    mutationFn:deleteTodo,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"]
      })
    }
  })

  const addmutation=useMutation({
    mutationFn:addTodo,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"]
      })
    }
  })

  const editmutation=useMutation({
    mutationFn:editTodo,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['todos']
      })
    }
  })

  const delimgmutation=useMutation({
    mutationFn:deleteimg,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["todos"]
      })
    }
  })

  const addimgmutation = useMutation({
    mutationFn: ({ id, img }) => addimg(id, img),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    }
  })

  let handleEdit=async(e)=>{
    e.preventDefault()
    let newUser={
      name:e.target.name.value,
      description:e.target.desc.value,
      id:elem
    }
    editmutation.mutate(newUser)
    setElem(null)
  }

  let handleSubmit=(e)=>{
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

  let handleaddimg = (e) => {
    e.preventDefault()
    let formData = new FormData()

    for (let el of e.target.photo.files) {
      formData.append("Images", el)
    }

    addimgmutation.mutate({
      id: add,
      img: formData
    })

    setElem(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Todos</h1>
            <p className="text-gray-500 mt-1">Manage your daily tasks</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 rounded-lg">
                + Add Todo
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Todo</DialogTitle>
                <DialogDescription>
                  <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                    <input className="border p-2 rounded-lg" type="file" multiple name="photo" />
                    <input className="border p-2 rounded-lg" placeholder="Todo name" type="text" name="name" />
                    <input className="border p-2 rounded-lg" placeholder="Description" type="text" name="desc" />
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Add Todo
                    </Button>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {data?.data?.map((e)=>{
            return (
              <div key={e.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">

                <Carousel className="w-full relative">
                  <CarouselContent>
                    {e.images.map((el) => {
                      return (
                        <CarouselItem key={el.id}>
                          <img
                            className="w-full h-52 object-cover"
                            src={"https://to-dos-api.softclub.tj/images/" + el.imageName}
                            alt=""
                          />
                          <button
                            className="absolute bottom-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={()=>delimgmutation.mutate(el.id)}
                          >
                            Delete image
                          </button>
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 z-10" />
                  <CarouselNext className="right-2 z-10" />
                </Carousel>

                <div className="p-5">
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    {e.name}
                  </h1>

                  <p className="text-gray-500 text-sm min-h-12 mb-5">
                    {e.description}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600"
                      onClick={()=>deleteMutation.mutate(e.id)}
                    >
                      Delete
                    </button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={()=>setElem(e.id)}>
                          Edit
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Todo</DialogTitle>
                          <DialogDescription>
                            <form className="flex flex-col gap-4 mt-4" onSubmit={handleEdit}>
                              <input className="border p-2 rounded-lg" defaultValue={e.name} type="text" name="name" />
                              <input className="border p-2 rounded-lg" defaultValue={e.description} type="text" name="desc" />
                              <Button type="submit">Save Changes</Button>
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={()=>setadd(e.id)}>
                          Add Image
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Images</DialogTitle>
                          <DialogDescription>
                            <form className="flex flex-col gap-4 mt-4" onSubmit={handleaddimg}>
                              <input className="border p-2 rounded-lg" type="file" multiple name="photo" />
                              <Button type="submit">Upload Images</Button>
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Home
