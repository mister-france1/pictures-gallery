import React, { FunctionComponent, useState } from 'react';
import styles from './FileUpload.module.scss';
import { useAxiosPost } from '../../hooks/useAxiosPost';

interface FileUploadProps {
    getFiles: () => void;
}

type Props = FileUploadProps;

const FileUpload: FunctionComponent<Props> = (props: FileUploadProps) => {
    const { getFiles } = props;
    const [postRequest] = useAxiosPost<string>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>();

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0] || null);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            await postRequest('/api/files', formData, undefined, { 'Content-Type': 'multipart/form-data' });

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            const id: ReturnType<typeof setTimeout> = setTimeout(async () => {
                await getFiles();
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }, 5000);
            setTimeoutId(id);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setSelectedFile(event.dataTransfer.files?.[0] || null);
        setDragging(false);
    };

    const fileName = selectedFile ? selectedFile.name : "No file selected";

    return (
        <div
            className={`${styles.fileUpload} ${dragging ? styles.dragging : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {dragging ? (
                <p>Drop the file here</p>
            ) : (
                <div>
                    <input type="file" onChange={handleFileInputChange} />
                    <p>{fileName}</p>
                    <button onClick={handleFileUpload}>Upload</button>
                </div>
            )}
        </div>
    );
}

export default FileUpload;

