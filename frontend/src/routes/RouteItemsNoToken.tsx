import RouteItem from "../types/RouteItem";
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
