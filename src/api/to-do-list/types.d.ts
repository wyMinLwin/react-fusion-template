export type CreateTodoPayload = {
    title: string
    description: string
    status: 'In Progress' | 'Completed' | 'Not Started'
}