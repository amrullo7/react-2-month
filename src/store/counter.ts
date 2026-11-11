import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface IData{
  name:string,
  age:number,
  email:string,
  status:boolean,
  id:number
}
export interface CounterState {
  data: IData[],
  isLoading:boolean

}
const initialState: CounterState = {
  data:[
  ],
  isLoading:false
}
let api="https://6aaa8b1dff4dd5698b4eabfb.mockapi.io/Data"
export const getData=createAsyncThunk("todo/getData",
  async ()=>{
    try {
      let {data}=await axios.get(api)
      return data
    } catch (error) {
      console.error(error);
      
    }
  }
)
export const deleteUser=createAsyncThunk("todo/deleteUser",
  async (id:number) => {
    try {
      await axios.delete(api+"/"+id)

    } catch (error) {
      console.error(error);
      
    }
  }
)
export const editUser=createAsyncThunk("todo/editUser",
  async (user,{dispatch}) => {
    try {
      await axios.put(api+"/"+user.id,user)
dispatch(getData())
    } catch (error) {
      console.error(error);
      
    }
  }
)
export const addUser=createAsyncThunk("todo/addUser",
  async (user:any) => {
    try {
      await axios.post(api,user)
    } catch (error) {
      console.error(error);
      
    }
  }
)

export const counterSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
  },
  extraReducers:(builder)=> {
    builder.addCase(getData.pending,(state,actions)=>{
state.isLoading=true
    })
    .addCase(getData.fulfilled,(state,actions)=>{
      state.isLoading=false
      state.data=actions.payload
    })
  },
})

export const {} = counterSlice.actions


export default counterSlice.reducer