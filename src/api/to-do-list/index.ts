import {
    useQuery,
    useQueryClient,
    type UseQueryOptions,
    useMutation,
    type UseMutationOptions
} from "@tanstack/react-query";
import axios from "axios";
import {TodoType} from "@/shared/types";
import type {CreateTodoPayload} from "@/api/to-do-list/types";

export const getAllTodos = {
    useQuery: (opt?: Partial<UseQueryOptions<unknown, Error, Array<TodoType>>>, onError?: () => void) => {
        return useQuery({
            queryKey: ["AllTodos"],
            queryFn: async () => {
                try {
                    const response = await axios.get('Todo/GetTodoAll');
                    const {data, status} = response.data;

                    if (status !== 0) {
                        onError?.();
                        return new Error("Error While Fetching Todos");
                    }
                    return data;

                } catch {
                    throw new Error("Error While Fetching Todos");
                }

            },
            ...opt,


        })
    }
}

export const addTodo = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, CreateTodoPayload, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addTodoAll'],
            mutationFn: (payload: CreateTodoPayload) => {
                return axios.post('Todo/AddTodo', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['AllTodos']
                }))
            },
            ...opt
        })
    }

}

export const updateTodo = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, TodoType, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['updateTodo'],
            mutationFn: (payload: TodoType) => {
                return axios.post('Todo/UpdateTodo', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['AllTodos']
                }))
            },
            ...opt
        })
    }
}