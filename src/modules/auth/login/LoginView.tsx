import ReactIcon from "@/assets/react.svg"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
})

const LoginView = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("🚀 ~ onSubmit ~ data:", data)
	}

	return (
		<div className="login-container">
			<div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-screen bg-transparent">
				<div className="w-[90vw] p-6 md:p-10 md:px-12 gap-1 bg-white flex flex-col items-center rounded-lg shadow-lg max-w-[480px]">
					<img
						src={ReactIcon}
						alt="React Logo"
						className="w-12 h-12"
					/>
					<p className="text-[10px] leading-[0.5rem] font-bold tracking-normal pb-4">
						<span className="text-indigo-700">FUSION </span>
						SOLUTION
					</p>

					<h3 className="md:text-3xl leading-[0.8] text-2xl font-medium tracking-tighter text-center">
						Welcome Back
					</h3>

					<p className="text-xs text-center text-gray-400">
						Login to your account below
					</p>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="hover:bg-indigo-600 w-full bg-indigo-700"
							>
								Login
							</Button>
						</form>
					</Form>

					<p className="text-xs text-center">
						Don't have an account?{" "}
						<span className="hover:underline active:underline font-medium text-indigo-700 cursor-pointer">
							Sign up for free
						</span>
					</p>
				</div>
			</div>

			<ul className="login-boxes z-0">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	)
}

export default LoginView
