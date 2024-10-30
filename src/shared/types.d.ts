export type APIResponse<T> = {
	message: string
	status: number
	data: T
}

export type TestType = {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: {
        width: number
        height: number
        depth: number
    }
}

export type TodoType = {
    activeFlag: boolean
    createdAt: string
    description: string
    id: string
    title: string
    updatedAt: string
    status: 'In Progress' | 'Completed' | 'Not Started'
}

