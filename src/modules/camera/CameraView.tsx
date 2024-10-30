import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CameraView = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [cameraStatus, setCameraStatus] = useState(false);
    const videoElement = useRef<HTMLVideoElement | null>(null);
    const canvasElement = useRef<HTMLCanvasElement | null>(null);
    const [uploadedType, setUploadedType] = useState('img');
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [uploadResponseURL, setUploadResponseURL] = useState('');
    const [imageData, setImageData] = useState('');
    const [facingMode] = useState('environment');
    const [isRecording, setIsRecording] = useState(false);
    const recordedChunks = useRef<Blob[]>([]);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState('');
    const [uploadFileReviewDialog, setUploadFileReviewDialog] = useState(false);

    const uploadFileToAPI = async (blob: Blob) => {
        setUploadedType(blob.type.includes('image') ? 'img' : 'video');
        const formData = new FormData();
        formData.append('file', blob);

        try {
            const response = await fetch(
                'https://crc-api-test.azurewebsites.net/api/v1/Authentication/UploadFile',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (response !== undefined && response.status !== 200) {
                console.error('Failed to upload file, status code:', response.status);
            }

            const result = await response.json();
            setUploadResponseURL(result?.file);
            setUploadFileReviewDialog(true);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const takePhoto = () => {
        const context = canvasElement.current?.getContext('2d');

        if (canvasElement.current && videoElement.current) {
            canvasElement.current.width = videoElement.current?.videoWidth || 0;
            canvasElement.current.height = videoElement.current?.videoHeight || 0;

            context?.drawImage(
                videoElement.current,
                0,
                0,
                canvasElement.current.width,
                canvasElement.current.height
            );

            const data = canvasElement.current.toDataURL('image/png');
            canvasElement.current.toBlob((blob) => {
                if (blob) {
                    setImageBlob(blob);
                }
            });

            setImageData(data);
        }
    };

    const openCamera = async () => {
        try {
            const constraints = {
                video: {
                    facingMode: facingMode,
                    aspectRatio: { ideal: 1 },
                },
            };

            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);

            if (videoElement.current) {
                videoElement.current.srcObject = newStream;

                videoElement.current.onloadedmetadata = () => {
                    videoElement.current?.play();
                };

                setCameraStatus(true);
            }
        } catch (err) {
            console.error('Error accessing the camera: ', err);
            closeCamera(); // Ensures the camera is closed in case of an error
        }
    };

    const closeCamera = () => {
        if (!stream) return;
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setCameraStatus(false);
    };

    const startRecording = () => {
        if (stream) {
            const newMediaRecorder = new MediaRecorder(stream);
            setMediaRecorder(newMediaRecorder);

            newMediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };

            newMediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks.current, { type: 'video/mp4' });
                setVideoBlob(blob);
                setRecordedVideoUrl(URL.createObjectURL(blob));
                recordedChunks.current.length = 0;
            };

            newMediaRecorder.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    useEffect(() => {
        openCamera();
    }, []);

    return (
        <div className="p-3 space-y-3">
            <h1 className="text-xl font-bold">Camera!</h1>

            <section className="grid grid-cols-2 gap-4 py-4 bg-white">
                <div className="flex flex-col items-center gap-3 col-span-2">
                    <video ref={videoElement} className="rounded"></video>

                    <div className="space-x-4">
                        <Button onClick={takePhoto}>Take Photo</Button>
                        {!isRecording ? (
                            <Button onClick={startRecording}>Record Video</Button>
                        ) : (
                            <Button variant="destructive" onClick={stopRecording}>Stop Recording</Button>
                        )}

                        {!cameraStatus ? (
                            <Button onClick={openCamera}>Open Camera</Button>
                        ) : (
                            <Button variant="destructive" onClick={closeCamera}>Close Camera</Button>
                        )}
                    </div>
                </div>

                <div className="col-span-2 grid grid-cols-2"></div>
                <div className="flex flex-col items-center gap-3">
                    {imageData && <h2>Captured Image</h2>}
                    <canvas ref={canvasElement} className="w-full sm:w-[400px] h-auto sm:h-[400px] aspect-square"></canvas>

                    {imageData && (
                        <div className="space-x-4">
                            <a href={imageData} download="Captured Image">
                                <Button> Download Image </Button>
                            </a>
                            <Button onClick={() => uploadFileToAPI(imageBlob!)}>Upload Image</Button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center gap-3">
                    {recordedVideoUrl && <h2>Captured Video</h2>}
                    {recordedVideoUrl && (
                        <video
                            src={recordedVideoUrl}
                            controls
                            className="w-full sm:w-[400px] h-auto sm:h-[400px] aspect-square resize-none"
                        ></video>
                    )}
                    {recordedVideoUrl && (
                        <div className="space-x-4">
                            <a href={recordedVideoUrl} download="Captured Video">
                                <Button> Download Video </Button>
                            </a>
                            <Button onClick={() => uploadFileToAPI(videoBlob!)}>Upload Video</Button>
                        </div>
                    )}
                </div>
            </section>
            <Dialog open={uploadFileReviewDialog}>
                <DialogContent>
                    <h1 className="text-xl font-bold">Upload File Review</h1>
                    <div className="flex justify-end space-x-4">
                        {uploadedType === 'img' ? (
                            <img
                                src={uploadResponseURL}
                                alt="Uploaded Image"
                                className="w-full h-auto"
                            />
                        ) : (
                            <video
                                src={uploadResponseURL}
                                controls
                                className="w-full h-auto"
                            ></video>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CameraView;