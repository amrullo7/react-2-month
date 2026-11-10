import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface IData{
    name:string,
    id:number,
    job:string,
    age:number
}
export interface CounterState {
  value: number,
  data:IData[]
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  data:[
    {id:1,name:"Abdullo", job:"student",age:16},
    {id:2,name:"Qaddam" , job:"student",age:16},
    {id:3,name:"Qurbon" , job:"student",age:16}
  ]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   increment:(state)=>{
    state.value+=1
   },
   decrement:(state)=>{
    state.value-=1
   },
   deleteUser:(state,{payload:id})=>{
state.data=state.data.filter((el)=>el.id!=id)
   },
   addUser:(state,{payload:user})=>{
state.data=[...state.data,user]
   },
    editUser:(state,{payload:user})=>{
state.data=state.data.map((e)=>e.id==user.id?user:e)
   }
  }
})

export const {increment,decrement ,deleteUser,addUser,editUser} = counterSlice.actions


export default counterSlice.reducer