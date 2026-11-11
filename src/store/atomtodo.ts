import { atom } from "jotai"

export type Todo={
id:number,
job:string
}
export const TodoAtom=atom<Todo[]>([
    {
        id:1,
        job:"Teacher"
    },  {
        id:2,
        job:"Student"
    },{
        id:3,
        job:"Singer"
    }
])

export const deletetom=atom(null,(get,set,id:number)=>{
    set( TodoAtom,get(TodoAtom).filter((el)=>el.id!=id))
})
export const addatom=atom(null,(get,set,user:Todo)=>{
    set( TodoAtom,[...get(TodoAtom),user])
})
export const editatom=atom(null,(get,set,user:any)=>{
    set( TodoAtom,get(TodoAtom).map((el)=>el.id==user.id?user:el))
})
