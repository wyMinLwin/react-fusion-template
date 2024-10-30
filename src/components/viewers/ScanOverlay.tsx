import React from "react"
import { cn } from "@/lib/utils"

interface ScanOverlayProps {
	className?: string
}

const ScanOverlay: React.FC<ScanOverlayProps> = ({ className }) => {
	return (
		<div className="scanner-container">
			<div className={cn("scanner-line bg-black/50", className)}></div>
			<span className="scanning-text">Scanning</span>
		</div>
	)
}

export default ScanOverlay
