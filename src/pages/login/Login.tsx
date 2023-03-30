import React, { FunctionComponent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import styles from './login.module.scss';
import { useAxiosPost } from '../../hooks/useAxiosPost';
import { TokenData } from '../../models/auth';
import { useFormik } from 'formik';
import { ErrorLogin, Login } from '../../models/login';
import Validation from '../../constants/validation';
import ValidationMessage from '../../components/validationMessage/ValidationMessage';

const validate = (values: Login): ErrorLogin => {
    const errors: ErrorLogin = {};

    if (!values.username) {
        errors.username = Validation.Required;
    }

    if (!values.password) {
        errors.password = Validation.Required;
    }

    return errors;
};

const LoginPage: FunctionComponent = () => {
    const [postRequest, {data, error, loaded}] = useAxiosPost<TokenData>();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: async ({username: name, password}: Login) => {
            await postRequest('/api/auth/authenticate', {name, password});
        },
    });

    useEffect(() => {
        if (data && loaded) {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('username', JSON.stringify(data.accessToken.payload.username));
            navigate('/');
        }
    }, [data, error, loaded]);

    return (
        <div className={styles.page}>
            <form onSubmit={formik.handleSubmit}>
                <Card className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <TextField id="username"
                                   name="username"
                                   label="Username"
                                   variant="standard"
                                   className={styles.input}
                                   onChange={formik.handleChange}
                                   value={formik.values.username}/>

                        <ValidationMessage message={formik.errors.username} />
                    </div>

                    <div className={styles.inputWrapper}>
                        <TextField id="password"
                                   name="password"
                                   label="Password"
                                   variant="standard"
                                   className={styles.input}
                                   type="password"
                                   onChange={formik.handleChange}
                                   value={formik.values.password} />

                        <ValidationMessage message={formik.errors.password} />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <Button variant="contained" className={styles.button} type="submit">Login</Button>
                    </div>

                    <div className={styles.info}>
                        Need an account?
                        <Link to="/register" className={styles.link}> Register </Link>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default LoginPage;
