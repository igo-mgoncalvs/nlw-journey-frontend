import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CreateTripPage } from "./pages/createTrip";
import { TripDetails } from "./pages/tripDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />,
  },
]);

export function App(){
  return <RouterProvider router={router} />
}