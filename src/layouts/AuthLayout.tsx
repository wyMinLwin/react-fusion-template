import { useAuth } from "@/hooks"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
	const { isAuthenticated } = useAuth()

	return isAuthenticated ? <Navigate to={"/"} replace /> : <Outlet />
}

export default AuthLayout
