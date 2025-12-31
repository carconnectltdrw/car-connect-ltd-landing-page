import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name:"chatbot",
  initialState:{ messages:[] as any[] },
  reducers:{
    addMessage:(s,a)=>{ s.messages.push(a.payload) }
  }
})

export const { addMessage } = slice.actions
export default slice.reducer
