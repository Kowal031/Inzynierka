import RouteItem from "../types/RouteItem";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";

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
