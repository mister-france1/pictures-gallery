import React, { FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import styles from './register.module.scss';

interface OwnProps {}

type Props = OwnProps;

const RegisterPage: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    const register = () => {
        navigate('/');
    };

    return (
        <div className={styles.page}>
            <Card className={styles.form}>
                <div className={styles.inputWrapper}>
                    <TextField id="username" label="Username" variant="standard" className={styles.input} />
                </div>

                <div className={styles.inputWrapper}>
                    <TextField id="email" label="Email" variant="standard" className={styles.input} />
                </div>

                <div className={styles.inputWrapper}>
                    <TextField id="password" label="Password" variant="standard" className={styles.input} />
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
