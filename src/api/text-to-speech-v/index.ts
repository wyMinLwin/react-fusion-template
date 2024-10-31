import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import textToSpeechServices from './services'
import type { AddTtoSVPayload, AddSToTVPayload } from './types'

export const addTextToSpeechVMutation = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, AddTtoSVPayload, unknown>) =>
        useMutation({
            mutationKey: ['addTextToSpeech'],
            mutationFn: (payload: AddTtoSVPayload) => textToSpeechServices.addTextToSpeech(payload),
            ...opt
        })
}

export const addSpeechToTextVMutation = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, AddSToTVPayload, unknown>) =>
        useMutation({
            mutationKey: ['addSpeechToText'],
            mutationFn: (payload: AddSToTVPayload) => textToSpeechServices.addSpeechToText(payload),
            ...opt
        })
}
