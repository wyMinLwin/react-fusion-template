import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

import { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import ScanOverlay from "./ScanOverlay"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"

// Set the workerSrc for the PDF library
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PDFViewerProps {
	pdfLink?: string
	className?: string
	isScanning?: boolean
	textLayer: boolean
	rotatePoint: number
}

const PDFViewer: React.FC<PDFViewerProps> = ({
	pdfLink,
	className,
	isScanning,
	textLayer,
	rotatePoint,
}) => {
	const pdfContainerRef = useRef<HTMLDivElement | null>(null)
	const [page, setPage] = useState(1)
	const [numPages, setNumPages] = useState(0)
	const [width, setWidth] = useState(0)

	useEffect(() => {
		const updateWidth = () => {
			if (pdfContainerRef.current) {
				setWidth(pdfContainerRef.current.offsetWidth)
			}
		}

		updateWidth()
		window.addEventListener("resize", updateWidth)

		return () => {
			window.removeEventListener("resize", updateWidth)
		}
	}, [])

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages)
	}

	const handleNextPage = () => {
		setPage((prevPage) => (prevPage < numPages ? prevPage + 1 : prevPage))
	}

	const handlePreviousPage = () => {
		setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
	}

	return (
		<section className={`w-full space-y-3 h-fit ${className}`}>
			<div
				ref={pdfContainerRef}
				className="pdf-width relative rounded-lg"
			>
				<Document
					file={pdfLink}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={<Skeleton className="w-full h-full" />}
					className="w-full h-full"
				>
					<Page
						pageNumber={page}
						width={width}
						rotate={rotatePoint * 90}
						renderTextLayer={textLayer}
					/>
				</Document>

				{isScanning && <ScanOverlay />}
			</div>

			{numPages > 1 && (
				<div className="flex items-center justify-center gap-2">
					<Button
						variant="secondary"
						size="icon"
						className="h-[28px]"
						onClick={handlePreviousPage}
					>
						<ChevronLeftIcon className="w-5 h-5" />
					</Button>
					<span className="text-xs font-medium">
						{page} / {numPages}
					</span>
					<Button
						variant="secondary"
						size="icon"
						className="h-[28px]"
						onClick={handleNextPage}
					>
						<ChevronRightIcon className="w-5 h-5" />
					</Button>
				</div>
			)}
		</section>
	)
}

export default PDFViewer
