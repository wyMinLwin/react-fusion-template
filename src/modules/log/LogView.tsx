import { fetchLogs } from "@/api/log/queries"
import { columns, columnVisibility } from "./table/columns"
import { useTable } from "@/hooks"
import TableUI from "@/components/table/TableUI"

const LogView = () => {
	const { data, isLoading } = fetchLogs.useQuery()

	const { table } = useTable(data, columns, columnVisibility)

	return (
		<div className="py-3 m-4 bg-white rounded-sm">
			<h4 className="p-3 pt-0 text-2xl font-bold">Log</h4>

			<TableUI table={table} columns={columns} loading={isLoading} />
		</div>
	)
}

export default LogView
