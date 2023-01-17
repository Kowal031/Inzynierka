import MainPage from "../pages/MainPage";
import TrainingPage from "../pages/TrainingPage";
import RouteItem from "../types/RouteItem";

const Routes: RouteItem[] = [
  {
    name: "Main Page",
    toPath: "/",
    component: <MainPage />,
  },
  {
    name: "Training Page",
    toPath: "/training-page",
    component: <TrainingPage />,
  },

];

export default Routes;
