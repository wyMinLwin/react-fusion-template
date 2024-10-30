import DefaultLayout from "@/layouts/DefaultLayout"
import HomeView from "@/modules/home/HomeView"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoginView from "@/modules/auth/login/LoginView"
import TodoListView from "@/modules/to-do-list/TodoListView.tsx"
import { Toaster } from "./ui/toaster"
import NotFoundView from "@/modules/not-found/NotFoundView"
import AuthLayout from "@/layouts/AuthLayout"
import LogView from "@/modules/log/LogView"
import ViewersView from "@/modules/viewers/ViewersView"

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "",
				element: <HomeView />,
			},
			{
				path: "to-do-list",
				element: <TodoListView />,
			},
			{
				path: "log",
				element: <LogView />,
			},
			{
				path: "viewers",
				element: <ViewersView />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "",
				element: <Navigate to="login" replace />,
			},
			{
				path: "login",
				element: <LoginView />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundView />,
	},
])

const Wrapper = () => {
	const queryClient = new QueryClient()
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}></RouterProvider>
			</QueryClientProvider>
			<Toaster />
		</>
	)
}

export default Wrapper
