import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import styles from './register.module.scss';
import { AxiosPost } from '../../models/axios';
import { useAxiosPost } from '../../hooks/useAxiosPost';

interface OwnProps {
}

type Props = OwnProps;

const RegisterPage: FunctionComponent<Props> = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [postRequest, {data}]: AxiosPost = useAxiosPost();
    const navigate = useNavigate();

    const register = async () => {
        await postRequest('/auth/register', {name: username, email, password});
        navigate('/');
    };

    useEffect(() => {
        console.log('data ', data);
    }, [data]);

    return (
        <div className={styles.page}>
            <Card className={styles.form}>
                <div className={styles.inputWrapper}>
                    <TextField id="username" label="Username" variant="standard" className={styles.input}
                               value={username}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}/>
                </div>

                <div className={styles.inputWrapper}>
                    <TextField id="email" label="Email" variant="standard" className={styles.input} value={email}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                </div>

                <div className={styles.inputWrapper}>
                    <TextField id="password" label="Password" variant="standard" className={styles.input}
                               value={password}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                </div>

                <div className={styles.buttonWrapper}>
                    <Button variant="contained" className={styles.button} onClick={register}>Register</Button>
                </div>

                <div className={styles.info}>
                    Already have an account?
                    <Link to="/login" className={styles.link}> Login </Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
