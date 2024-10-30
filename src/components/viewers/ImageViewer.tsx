import React, { useMemo, useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import ScanOverlay from "./ScanOverlay"

interface ImageContainerProps {
	imageUrl?: string
	rotatePoint: number
	altText: string
	isScanning?: boolean
	className?: string
}

const ImageContainer: React.FC<ImageContainerProps> = ({
	imageUrl,
	rotatePoint,
	altText,
	isScanning = false,
	className,
}) => {
	const imageContainerRef = useRef<HTMLDivElement | null>(null)
	const [boxMeasurements, setBoxMeasurements] = useState({
		width: 0,
		height: 0,
	})

	useEffect(() => {
		if (imageContainerRef.current) {
			const boxRect = imageContainerRef.current.getBoundingClientRect()
			setBoxMeasurements({
				width: boxRect?.width || 0,
				height: boxRect?.height || 0,
			})
		}
	}, [imageContainerRef.current])

	const rotateDegree = useMemo(() => rotatePoint * 90, [rotatePoint])

	const imageStyles = useMemo(
		() => ({
			width:
				rotatePoint % 2 === 0 ? `${boxMeasurements.width}px` : "auto",
			height:
				rotatePoint % 2 !== 0 ? `${boxMeasurements.width}px` : "auto",
			transform: `rotate(${rotateDegree}deg)`,
			objectFit: "contain" as const,
		}),
		[rotatePoint, boxMeasurements, rotateDegree]
	)

	return (
		<div
			ref={imageContainerRef}
			className={cn(
				"relative flex items-center justify-center w-full rounded-lg",
				className
			)}
		>
			<img
				src={imageUrl}
				alt={altText}
				className="transition-transform duration-300 rounded-lg"
				style={imageStyles}
			/>
			{isScanning && <ScanOverlay className="rounded-lg" />}
		</div>
	)
}

export default ImageContainer
