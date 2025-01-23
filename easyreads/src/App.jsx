import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import LandingPage from "./pages/LandingPage"
import "./App.css"
import { ThemeProvider } from "./components/theme-provider"

// add your routes here
const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children: [
      {
        path:"/",
        element:<LandingPage />
      }
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App