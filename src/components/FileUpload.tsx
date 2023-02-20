import React, { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import styles from './fileUpload.module.scss';
import { AxiosPost } from '../models/axios';
import { useAxiosPost } from '../hooks/useAxiosPost';

interface OwnProps {
}

type Props = OwnProps;

const FileUpload: FunctionComponent<Props> = (props) => {
    const {register, handleSubmit} = useForm();
    const [postRequest, {data, error, loaded}]: AxiosPost = useAxiosPost();
    const [fileName, setFileName] = useState<string>('Click to Select File');

    const onSubmit = async (data: any) => {
        const file = data.file[0]
        const name: string = file.name;
        setFileName(`${name} is uploaded`);
        const formData = new FormData();
        formData.append('file', file);
        await postRequest('/files', formData, null, { 'Content-Type': 'multipart/form-data' });
    };

    useEffect(() => {
        console.log('FileUpload ', {
            data,
            error,
            loaded
        });
    }, [data, error, loaded]);


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="file">
                    <input
                        style={{display: 'none'}}
                        id="file"
                        type="file"
                        {...register('file')}
                    />
                    <div className={styles.fileBox}>
                        {fileName}
                    </div>
                </label>
                <Button variant="contained" type="submit" className={styles.uploadButton}>
                    Upload
                </Button>
            </form>
        </div>
    );
};

export default FileUpload;
