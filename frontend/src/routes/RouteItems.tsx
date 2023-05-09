import WorkoutsPage from "../pages/WorkoutsPage";
import TrainingPage from "../pages/TrainingPage";
import RouteItem from "../types/RouteItem";
import StartWorkout from "../components/Workouts/startedWorkout/StartWorkout";
import HistoryPage from "../pages/HistoryPage";
import Register from "../components/User/Register";
import Login from "../components/User/Login";

const Routes: RouteItem[] = [
  {
    name: "Workouts",
    toPath: "/workouts",
    component: <WorkoutsPage />,
  },
  {
    name: "History",
    toPath: "/history-of-workouts",
    component: <HistoryPage />,
  },
  {
    name: "Measure",
    toPath: "/measure",
    component: <TrainingPage />,
  },
  {
    name: "My Profile",
    toPath: "/my-profile",
    component: <Register />,
  },
  {
    name: "Workout",
    toPath: "/workout/:workoutId",
    component:<StartWorkout />
  }
];

export default Routes;
