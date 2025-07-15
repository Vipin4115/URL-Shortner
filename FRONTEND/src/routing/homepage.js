import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routetree"
import HomePage from "../pages/HomePage"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
  })