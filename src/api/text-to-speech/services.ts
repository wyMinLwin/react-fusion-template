import type { AddTtoSPayload, TextToSpeechType, UpdateTTSPayload } from './types'
import axios from "axios";
import {APIResponse} from "@/shared/types";

const baseUrl = '/TextToSpeech'

const fetchTextToSpeechHistory = async (): Promise<APIResponse<TextToSpeechType[]>> => {
    const response = await axios.get<APIResponse<TextToSpeechType[]>>(
        `${baseUrl}/GetTextToSpeechHistory`
    )

    return response.data
}

const fetchTextToSpeechHistoryByID = async (id: string): Promise<APIResponse<TextToSpeechType>> => {
    const response = await axios.get<APIResponse<TextToSpeechType>>(
        `${baseUrl}/GetTextToSpeechHistoryByID?TextToSpeechID=${id}`
    )

    return response.data
}

const addTextToSpeech = async (payload: AddTtoSPayload) => {
    const response = await axios.post(`${baseUrl}/AddTextToSpeech`, payload)

    return response.data
}

const updateTextToSpeech = async (payload: UpdateTTSPayload) => {
    const response = await axios.post(`${baseUrl}/UpdateTextToSpeech`, payload)

    return response.data
}

export default {
    fetchTextToSpeechHistory,
    addTextToSpeech,
    fetchTextToSpeechHistoryByID,
    updateTextToSpeech
}
