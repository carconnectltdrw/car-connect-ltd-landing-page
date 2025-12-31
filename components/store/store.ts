import { configureStore } from "@reduxjs/toolkit"
import chatbotReducer from "./chatbotSlice"
import projectsReducer from "./projectsSlice"
import appsReducer from "./appsSlice"

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer,
    projects: projectsReducer,
    apps: appsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
