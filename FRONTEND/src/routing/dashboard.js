import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routetree"
import DashboardPage from "../pages/DashboardPage"
import { checkAuth } from "../utils/helper"

export const dasboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
    beforeLoad: checkAuth,
})