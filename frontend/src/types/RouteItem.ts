import { ReactNode } from "react";

interface RouteItem {
  toPath: string;
  name: string;
  component: ReactNode;
}

export default RouteItem;
