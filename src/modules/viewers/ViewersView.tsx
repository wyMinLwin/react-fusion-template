import React, { useState } from "react"
import { ImageViewer, PDFViewer } from "@/components/viewers"
import {
	EnterFullScreenIcon,
	FileIcon,
	FileTextIcon,
	OpenInNewWindowIcon,
	ResetIcon,
} from "@radix-ui/react-icons"

const ViewerComponent: React.FC = () => {
	const links = {
		image: "https://images.alphacoders.com/134/1342145.jpeg",
		pdf: "https://crchrstoragedev.blob.core.windows.net/uploadedimages/Lotus.pdf",
		word: "https://crchrstoragedev.blob.core.windows.net/uploadeddocument/inbound4042115537094484177_12046978-cc58-4adf-ada2-7d14e64e181a.docx",
	}

	const [rotatePoints, setRotatePoints] = useState({ image: 0, pdf: 0 })
	const [scans, setScans] = useState({ image: false, pdf: false })
	const [pdfTextLayer, setPdfTextLayer] = useState(false)

	const rotate = (
		type: keyof typeof rotatePoints,
		direction: "left" | "right"
	) => {
		setRotatePoints((prevPoints) => ({
			...prevPoints,
			[type]: prevPoints[type] + (direction === "left" ? -1 : 1),
		}))
	}

	const openScan = (type: keyof typeof scans) => {
		setScans((prevScans) => ({
			...prevScans,
			[type]: true,
		}))

		setTimeout(() => {
			setScans((prevScans) => ({
				...prevScans,
				[type]: false,
			}))
		}, 4000)
	}

	return (
		<div className="p-3 space-y-3">
			<h1 className="text-xl font-bold">Viewers!</h1>

			<section className="grid grid-cols-3 gap-4">
				<div className="col-span-2 space-y-3">
					{/* Image Viewer */}
					<div className="bg-primary/75 h-fit text-[#4a411e] p-4 pt-2 rounded-lg shadow-xl">
						<div className="flex items-center justify-between mb-3">
							<h4 className="font-semibold">Image Viewer</h4>

							<div className="flex gap-2 p-1 bg-white rounded-lg">
								<div
									className="hover:bg-accent text-primary min-w-[50px] flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
									onClick={() => openScan("image")}
								>
									<EnterFullScreenIcon className="w-4 h-4" />
									<span className="text-xs text-[#4a411e]">
										Scan
									</span>
								</div>

								<div
									className="hover:bg-accent text-primary min-w-[50px] flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
									onClick={() => rotate("image", "left")}
								>
									<ResetIcon className="w-4 h-4" />
									<span className="text-xs text-[#4a411e]">
										Left
									</span>
								</div>

								<div
									className="hover:bg-accent text-primary min-w-[50px] flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
									onClick={() => rotate("image", "right")}
								>
									<ResetIcon className="w-4 h-4 -rotate-180" />
									<span className="text-xs text-[#4a411e]">
										Right
									</span>
								</div>
							</div>
						</div>

						<ImageViewer
							imageUrl={links.image}
							altText="Image"
							rotatePoint={rotatePoints.image}
							isScanning={scans.image}
							className={
								rotatePoints.image % 2 !== 0
									? "shadow-none"
									: "shadow"
							}
						/>
					</div>

					{/* Word File Viewer */}
					<div className="bg-[#b8cedc] h-fit text-[#184363] p-4 pt-2 rounded-lg shadow-xl">
						<div className="flex items-center justify-between mb-3">
							<h4 className="font-semibold">Word File</h4>

							<a
								href={links.word}
								target="_blank"
								rel="noopener noreferrer"
								className="hover:bg-accent text-[#b8cedc] min-w-[50px] flex flex-col items-center gap-1 p-1 bg-white rounded shadow cursor-pointer"
							>
								<OpenInNewWindowIcon className="w-4 h-4" />
								<span className="text-xs text-[#184363]">
									View
								</span>
							</a>
						</div>
						<p className="text-sm font-medium">
							Don't have a UI for Word file now.
						</p>
					</div>
				</div>

				{/* PDF Viewer */}
				<div className="bg-success/75 text-[#1c471f] h-fit col-span-1 p-4 pt-2 rounded-lg shadow-xl">
					<div className="flex items-center justify-between mb-3">
						<h4 className="font-semibold">PDF Viewer</h4>
					</div>

					<div className="flex gap-2 p-1 my-3 bg-white rounded-lg">
						<div
							className="hover:bg-accent text-success/75 min-w-[50px] h-fit flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
							onClick={() => openScan("pdf")}
						>
							<EnterFullScreenIcon className="w-4 h-4" />
							<span className="text-xs text-[#1c471f]">Scan</span>
						</div>

						<div
							className="hover:bg-accent text-success/75 min-w-[50px] h-fit flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
							onClick={() => setPdfTextLayer(!pdfTextLayer)}
						>
							{pdfTextLayer ? (
								<FileTextIcon className="w-4 h-4" />
							) : (
								<FileIcon className="w-4 h-4" />
							)}
							<span className="text-xs text-[#1c471f] text-center">
								Text Layer
							</span>
						</div>

						<div
							className="hover:bg-accent text-success/75 min-w-[50px] h-fit flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
							onClick={() => rotate("pdf", "left")}
						>
							<ResetIcon className="w-4 h-4" />
							<span className="text-xs text-[#4a411e]">Left</span>
						</div>

						<div
							className="hover:bg-accent text-success/75 min-w-[50px] h-fit flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
							onClick={() => rotate("pdf", "right")}
						>
							<ResetIcon className="w-4 h-4 -rotate-180" />
							<span className="text-xs text-[#4a411e]">
								Right
							</span>
						</div>

						<a
							href={links.pdf}
							target="_blank"
							rel="noopener noreferrer"
							className="hover:bg-accent text-success/75 min-w-[50px] h-fit flex flex-col items-center gap-1 p-1 bg-white rounded cursor-pointer"
						>
							<OpenInNewWindowIcon className="w-4 h-4" />
							<span className="text-xs text-[#184363]">View</span>
						</a>
					</div>

					<PDFViewer
						pdfLink={links.pdf}
						isScanning={scans.pdf}
						textLayer={pdfTextLayer}
						rotatePoint={rotatePoints.pdf}
					/>
				</div>
			</section>
		</div>
	)
}

export default ViewerComponent
