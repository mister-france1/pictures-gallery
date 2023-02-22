import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import styles from './login.module.scss';
import { useAxiosPost } from '../../hooks/useAxiosPost';
import { TokenData } from '../../models/auth';

interface OwnProps {
}

type Props = OwnProps;

const LoginPage: FunctionComponent<Props> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [postRequest, {data, error, loaded}] = useAxiosPost<TokenData>();
    const navigate = useNavigate();

    const login = async () => {
        await postRequest('/auth/authenticate', {name: username, password});
    };

    useEffect(() => {
        if (data && loaded) {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('username', JSON.stringify(data.accessToken.payload.username));
            navigate('/');
        }
    }, [data, error, loaded]);

    return (
        <div className={styles.page}>
            <Card className={styles.form}>
                <div className={styles.inputWrapper}>
                    <TextField id="username" label="Username" variant="standard" className={styles.input}
                               value={username}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>
                </div>

                <div className={styles.inputWrapper}>
                    <TextField id="password" label="Password" variant="standard" className={styles.input}
                               type="password"
                               value={password}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                </div>

                <div className={styles.buttonWrapper}>
                    <Button variant="contained" className={styles.button} onClick={login}>Login</Button>
                </div>

                <div className={styles.info}>
                    Need an account?
                    <Link to="/register" className={styles.link}> Register </Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
