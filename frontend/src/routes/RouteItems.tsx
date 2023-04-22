import WorkoutsPage from "../pages/WorkoutsPage";
import TrainingPage from "../pages/TrainingPage";
import RouteItem from "../types/RouteItem";

const Routes: RouteItem[] = [
  {
    name: "Workouts",
    toPath: "/",
    component: <WorkoutsPage />,
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
