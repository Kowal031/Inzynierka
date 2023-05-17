import WorkoutsPage from "../pages/WorkoutsPage";
import RouteItem from "../types/RouteItem";
import StartWorkout from "../components/Workouts/startedWorkout/StartWorkout";
import HistoryPage from "../pages/HistoryPage";

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
    name: "Workout",
    toPath: "/workout/:workoutId",
    component: <StartWorkout />,
  },
];

export default Routes;
