import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Cities from "./pages/Cities";
import Timetable from "./pages/Timetable";
import { StationsProvider } from "./contexts/StationsContext";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/layout/Header";
import StationSearch from "./components/search/StationSearch";
import { HeaderProvider } from "./contexts/HeaderContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <StationSearch />
      <Outlet />
    </>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Cities />
      },
      {
        path: 'timetable/:stationCode',
        element: <Timetable />
      }
    ]
  }
])

function App() {
  return (
    <StationsProvider>
      <HeaderProvider>
        <RouterProvider router={router} />
      </HeaderProvider>
    </StationsProvider>
  )
}

export default App
