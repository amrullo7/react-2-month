import {  createSlice } from '@reduxjs/toolkit'

interface IData{
  id:number,
  name:string
}
export interface CounterState {
  data: IData[]

}
const initialState: CounterState = {
  data:[
    {
      id:1,
      name:"Abdullo"
    },{
      id:2,
      name:"Muhammad"
    },{
      id:3,
      name:"Qurbon"
    }
  ]
}

export const counterSlice = createSlice({
name: 'todo',
initialState,
reducers: {
  deletered:(state,{payload:id})=>{
state.data=state.data.filter((el)=>el.id!=id)
  },
  addred:(state,{payload:user})=>{
    state.data=[...state.data,user]
  },
   editred:(state,{payload:user})=>{
    state.data=state.data.map((el)=>el.id==user.id?user:el)
  }
},
})



export const {deletered,addred,editred} = counterSlice.actions


export default counterSlice.reducer