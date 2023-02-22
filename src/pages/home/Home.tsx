import React, { useCallback, useEffect, useState } from 'react';
import styles from './home.module.scss';
import { useAxiosGet } from '../../hooks/useAxiosGet';
import FileUpload from '../../components/fileUpload/FileUpload';
import ImageList from '../../components/imageList/ImageList';
import { ImageType } from '../../models/image';
import Header from '../../components/header/Header';
import { useAxiosPost } from '../../hooks/useAxiosPost';
import { useNavigate } from 'react-router-dom';
import { TokenData } from '../../models/auth';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const [username, setUsername] = useState<string>('Guest');
    const [getRequest, {data}] = useAxiosGet<ImageType[]>();
    const [postRequest] = useAxiosPost();
    const navigate = useNavigate();

    const getFiles = useCallback(async () => {
        await getRequest('/files');
    }, [getRequest]);

    const onLogout = useCallback(async () => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const user: TokenData = JSON.parse(userJson);

            await postRequest('/auth/logout', null, null, {
                'Authorization-RefreshToken': user.refreshToken.token,
                'Authorization-AccessToken': user.accessToken.jwtToken
            });
        }

        localStorage.removeItem('user');
        localStorage.removeItem('username');
        navigate('/login')
    }, [postRequest, navigate]);

    useEffect(() => {
        const usernameJson = localStorage.getItem('username');
        if (usernameJson) {
            const username = JSON.parse(usernameJson);
            setUsername(username);
        }

        getFiles();
    }, []);

    useEffect(() => {
        console.log('authorized status: ', data);
    }, [data]);

    const imageListBlock = data ? <ImageList images={data} /> : null;

    return (
        <div className={styles.page}>
            <Header username={username} logout={onLogout}/>
            <main className={styles.main}>
                <div className={styles.fileWrapper}>
                    <FileUpload getFiles={getFiles} />
                </div>
                <div className={styles.imageListWrapper}>
                    {imageListBlock}
                </div>
            </main>
        </div>
    );
};

export default HomePage;
