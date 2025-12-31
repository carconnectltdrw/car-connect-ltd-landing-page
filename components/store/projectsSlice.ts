import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await fetch("/api/chat/projects")
    return response.json()
  }
)

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData: any) => {
    const response = await fetch("/api/chat/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData)
    })
    return response.json()
  }
)
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/chat/projects/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete project")
      return id
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      )
    }
  }
)

const slice = createSlice({
  name: "projects",
  initialState: { list: [] as any[], loading: false },
  reducers: {
    setProjects: (s, a) => { s.list = a.payload }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
        state.loading = false
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload)
        state.loading = false
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false
        console.error('Failed to delete project:', action.payload)
      })
  }
})

export const { setProjects } = slice.actions
export default slice.reducer
