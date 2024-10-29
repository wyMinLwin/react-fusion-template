import { ReactNode } from "react"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/hooks"
import { useNavigate } from "react-router-dom"

type LogoutDialogProps = {
	children: ReactNode
}

const LogoutDialog = ({ children }: LogoutDialogProps) => {
	const navigate = useNavigate()

	const { userLogout } = useAuth()

	const logout = () => {
		userLogout()

		navigate("/auth/login")
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className="max-w-[400px] w-[90vw] rounded-sm">
				<AlertDialogHeader>
					<AlertDialogTitle>Log out</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to log out?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive hover:bg-destructive active:bg-destructive"
						onClick={logout}
					>
						Log out
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default LogoutDialog
