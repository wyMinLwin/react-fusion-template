import axios from "axios"
import type { LogEntryType } from "./types"
import { APIResponse } from "@/shared/types"

const baseUrl = "/Log"

const getLogs = async (): Promise<APIResponse<LogEntryType[]>> => {
	const response = await axios.get<APIResponse<LogEntryType[]>>(
		`${baseUrl}/GetLog`
	)

	return response.data
}

export default { getLogs }
