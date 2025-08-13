import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cities from "./pages/Cities";
import Timetable from "./pages/Timetable";
import { StationsProvider } from "./contexts/StationsContext";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Cities />,
    errorElement: <ErrorPage />
  },
  {
    path: 'timetable/:stationCode',
    element: <Timetable />
  }
])

function App() {
  return (
    <StationsProvider>
      <RouterProvider router={router} />
    </StationsProvider>
  )
}

export default App
