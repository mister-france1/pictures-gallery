import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './FileUpload.module.scss';
import { useAxiosPost } from '../../hooks/useAxiosPost';

interface FileUploadProps {
    getFiles: () => void;
}

type Props = FileUploadProps;

const FileUpload: FunctionComponent<Props> = (props: FileUploadProps) => {
    const { getFiles } = props;
    const [postRequest, {data, error, loaded}] = useAxiosPost<string>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0] || null);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            await postRequest('/api/files', formData, null, { 'Content-Type': 'multipart/form-data' });
        }
    };

    useEffect(() => {
        if (data && loaded) {
            console.log('File upload status: ', data);

            setTimeout(() => {
                getFiles();
            }, 1000);
        }
    }, [data, error, loaded, getFiles]);

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

