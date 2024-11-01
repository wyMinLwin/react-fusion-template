import {

    useQuery,

    type UseQueryOptions
} from '@tanstack/react-query'

import textToSpeechServices from './services'
import type { TextToSpeechType } from './types'
import {APIResponse} from "@/shared/types";

// export const fetchHistory = {
//     useQuery: (opt?: UseQueryOptions<TextToSpeechType[], Error>) =>
//         useQuery<TextToSpeechType[], Error>({
//             queryKey: ['fetchHistory'],
//             queryFn: async () => {
//                 console.log('fetchHistory')
//                 const response: APIResponse<TextToSpeechType[]> =
//                     await textToSpeechServices.fetchTextToSpeechHistory()
//
//                 return response.data
//             },
//             ...opt
//         })
// }

export const fetchHistoryByID = {
    useQuery: (id: string, opt?: Partial<UseQueryOptions<TextToSpeechType, Error>>) =>
        useQuery<TextToSpeechType, Error>({
            queryKey: ['fetchHistoryByID'],
            queryFn: async () => {
                console.log('fetchHistoryByID')
                if (!id) {
                    throw new Error('ID is required')
                }
                const response: APIResponse<TextToSpeechType> =
                    await textToSpeechServices.fetchTextToSpeechHistoryByID(id)

                return response.data
            },
            ...opt
        })
}

// export const addTextToSpeechMutation = {
//     useMutation: (opt?: UseMutationOptions<any, Error, AddTtoSPayload, any>) =>
//         useMutation({
//             mutationKey: ['addTextToSpeech'],
//             mutationFn: (payload: AddTtoSPayload) => textToSpeechServices.addTextToSpeech(payload),
//             ...opt
//         })
// }
//
// export const updateTextToSpeechMutation = {
//     useMutation: (opt?: UseMutationOptions<any, Error, UpdateTTSPayload, any>) =>
//         useMutation({
//             mutationKey: ['updateTextToSpeech'],
//             mutationFn: (payload: UpdateTTSPayload) =>
//                 textToSpeechServices.updateTextToSpeech(payload),
//             ...opt
//         })
// }
