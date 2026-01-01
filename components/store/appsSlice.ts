import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchApps = createAsyncThunk(
  "apps/fetchApps",
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/apps`)
    return response.json()
  }
)

export const createApp = createAsyncThunk(
  "apps/createApp",
  async (appData: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/apps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    })
    return response.json()
  }
)

export const deleteApp = createAsyncThunk(
  "apps/deleteApp",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/apps/${id}`, { method: "DELETE" })
      if (!response.ok) {
        throw new Error('Failed to delete app')
      }
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const slice = createSlice({
  name:"apps",
  initialState:{ list:[] as any[], loading: false },
  reducers:{
    setApps:(s,a)=>{ s.list = a.payload }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchApps.pending, (state) => {
        state.loading = true
      })
      .addCase(createApp.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
        state.loading = false
      })
      .addCase(createApp.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteApp.fulfilled, (state, action) => {
        state.list = state.list.filter(a => a.id !== action.payload)
        state.loading = false
      })
      .addCase(deleteApp.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteApp.rejected, (state, action) => {
        state.loading = false
        console.error('Failed to delete app:', action.payload)
      })
  }
})

export const { setApps } = slice.actions
export default slice.reducer