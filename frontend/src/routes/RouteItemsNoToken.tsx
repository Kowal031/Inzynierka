import WorkoutsPage from "../pages/WorkoutsPage";
import TrainingPage from "../pages/TrainingPage";
import RouteItem from "../types/RouteItem";
import StartWorkout from "../components/Workouts/startedWorkout/StartWorkout";
import HistoryPage from "../pages/HistoryPage";
import Register from "../components/User/Register";
import Login from "../components/User/Login";

const Routes: RouteItem[] = [
  {
    name: "Login",
    toPath: "/",
    component: <Login />,
  },
  {
    name: "Register",
    toPath: "/register",
    component: <Register />,
  },
];

export default Routes;
