import Cookies from "js-cookie"
import { useState } from "react"

export default function useAuth() {
	const token = Cookies.get("react-template-app-token")
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

	const userLogin = (token: string) => {
		Cookies.set("react-template-app-token", token)

		setIsAuthenticated(true)
	}

	const userLogout = () => {
		Cookies.remove("react-template-app-token")

		setIsAuthenticated(false)
	}

	return { isAuthenticated, userLogin, userLogout }
}
