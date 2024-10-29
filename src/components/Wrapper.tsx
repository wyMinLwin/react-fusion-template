import DefaultLayout from "@/layouts/DefaultLayout";
import HomeView from "@/modules/home/HomeView";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoListView from "@/modules/to-do-list/TodoListView.tsx";

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
				element: <TodoListView />
			}
		],
	},
]);

const Wrapper = () => {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}></RouterProvider>
			</QueryClientProvider>
		</>
	);
};

export default Wrapper;
