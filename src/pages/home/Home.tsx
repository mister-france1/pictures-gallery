import React, { useCallback, useEffect } from 'react';
import styles from './home.module.scss';
import { useAxiosGet } from '../../hooks/useAxiosGet';
import FileUpload from '../../components/fileUpload/FileUpload';
import ImageList from '../../components/imageList/ImageList';
import { ImageType } from '../../models/image';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const [getRequest, {data}] = useAxiosGet<ImageType[]>();

    const getFiles = useCallback(async () => {
        await getRequest('/files');
    }, [getRequest]);

    useEffect(() => {
        getFiles();
    }, []);

    useEffect(() => {
        console.log('authorized status: ', data);
    }, [data]);

    const imageListBlock = data ? <ImageList images={data} /> : null;

    return (
        <div className={styles.page}>
            <div className={styles.imageListWrapper}>
                {imageListBlock}
            </div>
            <div>
                <FileUpload getFiles={getFiles} />
            </div>
        </div>
    );
};

export default HomePage;
