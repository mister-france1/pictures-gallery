import React, { useEffect } from 'react';
import styles from './home.module.scss';
import { AxiosPost } from '../../models/axios';
import { useAxiosGet } from '../../hooks/useAxiosGet';
import FileUpload from '../../components/FileUpload';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const [getRequest, {data}]: AxiosPost = useAxiosGet();

    useEffect(() => {
        (async () => {
            await getRequest('/auth/authorized');
        })();
    }, []);

    useEffect(() => {
        console.log('authorized ', data);
    }, [data]);

    return (
        <div className={styles.page}>
            <div>
                <FileUpload />
            </div>
        </div>
    );
};

export default HomePage;
