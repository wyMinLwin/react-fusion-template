import type { ColumnDef, TableOptions } from "@tanstack/react-table"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

type ColumnVisibilityType = {
	[key: string]: boolean
}

// Define a generic type T for data
export default function useTable<T>(
	data: T[] | undefined,
	columns: ColumnDef<T>[],
	columnVisibility: ColumnVisibilityType,
	opt?: Partial<TableOptions<T>>
) {
	const table = useReactTable<T>({
		get data() {
			return data || []
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		initialState: {
			columnVisibility,
		},
		...opt,
	})

	return { table }
}
