import React, { FunctionComponent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import styles from './register.module.scss';
import { useAxiosPost } from '../../hooks/useAxiosPost';
import { TokenData } from '../../models/auth';
import { useFormik } from 'formik';
import Validation from '../../constants/validation';
import { ErrorRegistration, Registration } from '../../models/register';
import ValidationMessage from '../../components/validationMessage/ValidationMessage';
import { EMAIL, LOWERCASE, NUMBER, SPECIAL_CHARACTER, UPPERCASE } from '../../constants/regexp';

const validate = (values: Registration): ErrorRegistration => {
    const errors: ErrorRegistration = {};

    if (!values.username) {
        errors.username = Validation.Required;
    }

    if (!values.email) {
        errors.email = Validation.Required;
    } else if (!EMAIL.test(values.email)) {
        errors.email = Validation.EmailInvalid;
    }

    if (!values.password) {
        errors.password = Validation.Required;
    } else if (values.password.length < 8) {
        errors.password = Validation.PasswordLength;
    } else if (!NUMBER.test(values.password)) {
        errors.password = Validation.PasswordNumber;
    } else if (!SPECIAL_CHARACTER.test(values.password)) {
        errors.password = Validation.PasswordSpecialCharacter;
    } else if (!UPPERCASE.test(values.password)) {
        errors.password = Validation.PasswordUppercase;
    } else if (!LOWERCASE.test(values.password)) {
        errors.password = Validation.PasswordLowercase;
    }

    return errors;
};

const RegisterPage: FunctionComponent = () => {
    const [postRequest, {data, error, loaded}] = useAxiosPost<TokenData>();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validate,
        onSubmit: async ({username: name, email, password}: Registration) => {
            await postRequest('/api/auth/register', {name, email, password});
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
                        <TextField id="email"
                                   name="email"
                                   label="Email"
                                   variant="standard"
                                   className={styles.input}
                                   onChange={formik.handleChange}
                                   value={formik.values.email}/>

                        <ValidationMessage message={formik.errors.email} />
                    </div>

                    <div className={styles.inputWrapper}>
                        <TextField id="password"
                                   name="password"
                                   label="Password"
                                   variant="standard"
                                   className={styles.input}
                                   type="password"
                                   onChange={formik.handleChange}
                                   value={formik.values.password}/>

                        <ValidationMessage message={formik.errors.password} />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <Button variant="contained" className={styles.button} type="submit">Register</Button>
                    </div>

                    <div className={styles.info}>
                        Already have an account?
                        <Link to="/login" className={styles.link}> Login </Link>
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default RegisterPage;
