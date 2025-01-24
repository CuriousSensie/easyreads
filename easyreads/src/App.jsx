import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Read from "./pages/Read";
import { useUser } from "@clerk/clerk-react";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  // The redirection logic is handled here. If the user is not signed in, they will be redirected to the LandingPage, else they will be redirected to the Home page.
  // Since the redirection logic is based on authentication, so i used useUser hook from Clerk to check if the user is signed in or not.  THe useUser hook takes 1-2 seconds to load, so i used isLoaded to check if the user is loaded or not. If the user is not loaded, the Spinner component will be displayed.

  const { user, isLoaded } = useUser();  // use isLoaded to check if the Clerk state is ready

  // If Clerk is still loading, show the spinner
  if (!isLoaded) {
    return <Spinner />;
  }

  // Add your routes here
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: !user ? <LandingPage /> : <Navigate to="/home" />,  // Redirect to Home if signed in
        },
        {
          path: "/home",
          element: user ? <Home /> : <Navigate to="/" />,  // Redirect to LandingPage if not signed in
        },
        {
          path: "/book",
          element: user ? <Book /> : <Navigate to="/" />,  // Redirect to LandingPage if not signed in
        },
        {
          path: "/read",
          element: user ? <Read /> : <Navigate to="/" />,  // Redirect to LandingPage if not signed in
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
