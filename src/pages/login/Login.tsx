import React, { FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import styles from './login.module.scss';

interface OwnProps {
}

type Props = OwnProps;

const LoginPage: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    const login = () => {
        navigate('/');
    };

    return (
        <div className={styles.page}>
            <Card className={styles.form}>
                <div className={styles.inputWrapper}>
                    <TextField id="username" label="Username" variant="standard" className={styles.input} />
                </div>

                <div className={styles.inputWrapper}>
                    <TextField id="password" label="Password" variant="standard" className={styles.input} />
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
