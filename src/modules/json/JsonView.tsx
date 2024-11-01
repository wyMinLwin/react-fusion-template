import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios, { AxiosError } from "axios"
import { EXAMPLE_RESPONSE_DATA, LANGUAGE_CHOICES, URL } from "./data"
import ResponseData from "./chunks/ResponseData"
import { Label } from "@/components/ui/label"
import CopyButton from "@/components/button-with-functions/CopyButton"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { CodeExample } from "./chunks/CodeExample"

const formSchema = z.object({
	title: z
		.string({
			required_error: "Title is required",
		})
		.min(2),
	audioFile: z.instanceof(File).nullable(),
	language: z.string({
		required_error: "Language is required",
	}),
	token: z.string({
		required_error: "Token is required",
	}),
})

type FormSchema = z.infer<typeof formSchema>

const JsonView = () => {
	const [responseData, setResponseData] = useState(EXAMPLE_RESPONSE_DATA)
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			audioFile: null,
			language: "en-US",
			token: "",
		},
	})

	const submitForm = async (values: FormSchema) => {
		try {
			if (!values.audioFile) throw new Error()

			const formData = new FormData()
			formData.append("AudioFile", values.audioFile)
			formData.append("Title", values.title)
			formData.append("Language", values.language)

			const response = await axios.post(URL, formData, {
				headers: {
					Authorization: `Bearer ${values.token}`,
					accept: "*/*",
				},
			})

			setResponseData(response.data)
			toast({
				title: "Speech To Text requested Successfully",
				variant: "success",
			})
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				toast({
					title: "Unauthorized: Invalid token or access denied",
					variant: "destructive",
				})
			} else {
				console.error("Unexpected error:", error)
				toast({ title: "An error occurred", variant: "destructive" })
			}
		}
	}

	return (
		<div className="m-4 bg-white">
			<h4 className="p-3 pb-0 text-xl font-bold">Json</h4>

			<div className="grid grid-cols-2 gap-3 py-3">
				<section className="px-3">
					<div className="mb-4">
						<Label>URL</Label>
						<div className="relative">
							<Input
								value={URL}
								disabled
								aria-label="URL"
								className="disabled:cursor-text pr-9"
							/>
							<CopyButton
								text={URL}
								className="absolute top-0 right-0"
							/>
						</div>
					</div>

					<Form {...form}>
						<form
							className="space-y-2"
							onSubmit={form.handleSubmit(submitForm)}
						>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Title{" "}
											<span className="text-destructive">
												*
											</span>
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type="text"
													placeholder="Title"
													{...field}
												/>
												<CopyButton
													text={field.value || ""}
													className="absolute top-0 right-0"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="audioFile"
								render={({
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									field: { value, onChange, ...fieldProps },
								}) => (
									<FormItem>
										<FormLabel>
											Audio File{" "}
											<span className="text-destructive">
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												type="file"
												accept="audio/*"
												{...fieldProps}
												onChange={(event) =>
													onChange(
														event.target.files &&
															event.target
																.files[0]
													)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Language{" "}
											<span className="text-destructive">
												*
											</span>
										</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{LANGUAGE_CHOICES.map(
													(choice) => (
														<SelectItem
															key={choice.value}
															value={choice.value}
														>
															{choice.text}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="token"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Token{" "}
											<span className="text-destructive">
												*
											</span>
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type="text"
													placeholder="Token"
													{...field}
												/>
												<CopyButton
													text={field.value || ""}
													className="absolute top-0 right-0"
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>

					<div>
						<div className="my-3">
							<div className="flex items-center justify-between mb-1">
								<h5>Response</h5>

								<Button onClick={form.handleSubmit(submitForm)}>
									Call Service
								</Button>
							</div>
							<hr />
						</div>

						<ResponseData responseData={responseData} />
					</div>
				</section>

				<section className="px-3">
					<CodeExample values={form.getValues()} url={URL} />
				</section>
			</div>
		</div>
	)
}

export default JsonView
