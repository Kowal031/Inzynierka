import MainPage from "../pages/MainPage";
import TrainingPage from "../pages/TrainingPage";
import RouteItem from "../types/RouteItem";

const Routes: RouteItem[] = [
  {
    name: "Workouts",
    toPath: "/",
    component: <MainPage />,
  },
  {
    name: "History",
    toPath: "/history",
    component: <TrainingPage />,
  },
  {
    name: "Measure",
    toPath: "/measure",
    component: <TrainingPage />,
  },
  {
    name: "My Profile",
    toPath: "/my-profile",
    component: <TrainingPage />,
  },

];

export default Routes;
