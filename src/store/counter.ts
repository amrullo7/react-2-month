import { createSlice } from '@reduxjs/toolkit'

interface IData{
  name:string,
  age:number,
  email:string,
  status:boolean,
  id:number
}
export interface CounterState {
  value: number,
  data: IData[]
}
const initialState: CounterState = {
  value: 0,
  data:[
 {name:"Abdullo",age:18,status:false,email:"abdullo@gmali.com",id:8},
 {name:"Saidjamol",age:22,status:true,email:"saidjamol@gmali.com",id:9},
 {name:"SaidAhmad",age:14,status:false,email:"saidahmad@gmali.com",id:18},
 {name:"Sayfiddin",age:19,status:true,email:"sayfiddin@gmali.com",id:85},

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
      state.data=state.data.map((el)=>el.id==user.id?user:el)
    }

  }
})

export const {increment,decrement,deleteUser,addUser,editUser} = counterSlice.actions


export default counterSlice.reducer