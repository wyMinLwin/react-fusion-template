import { ColumnDef } from "@tanstack/react-table"
import type { LogEntryType } from "@/api/log/types"

export const columns: ColumnDef<LogEntryType>[] = [
	{
		accessorKey: "logId",
		header: () => <div className="text-right">Log Id</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("logId")}</div>
		},
	},
	{
		accessorKey: "ip",
		header: () => <div className="text-right">IP Address</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("ip")}</div>
		},
	},
	{
		accessorKey: "description",
		header: () => <div className="text-right">Description</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("description")}</div>
		},
	},
	{
		accessorKey: "exception",
		header: () => <div className="text-right">Exception</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("exception")}</div>
		},
	},
	{
		accessorKey: "laptopModel",
		header: () => <div className="text-right">Laptop Model</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("laptopModel")}</div>
		},
	},
	{
		accessorKey: "logTrace",
		header: () => <div className="text-right">Log Trace</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("logTrace")}</div>
		},
	},
	{
		accessorKey: "logType",
		header: () => <div className="text-right">Log Type</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("logType")}</div>
		},
	},
	{
		accessorKey: "methodName",
		header: () => <div className="text-right">Method Name</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("methodName")}</div>
		},
	},
	{
		accessorKey: "userName",
		header: () => <div className="text-right">User Name</div>,
		cell: ({ row }) => {
			return <div className="text-right">{row.getValue("userName")}</div>
		},
	},
	{
		accessorKey: "createdAt",
	},
]

export const columnVisibility = {
	createdAt: false,
}
