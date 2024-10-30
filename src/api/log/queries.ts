import logServices from "./services"
import { APIResponse } from "@/shared/types"
import type { LogEntryType } from "./types"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

export const fetchLogs = {
	useQuery: (opt?: UseQueryOptions<LogEntryType[], Error>) =>
		useQuery<LogEntryType[], Error>({
			queryKey: ["getLogs"],
			queryFn: async () => {
				const response: APIResponse<LogEntryType[]> =
					await logServices.getLogs()

				return response.data
			},
			...opt,
		}),
}
