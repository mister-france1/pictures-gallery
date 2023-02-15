import React, { FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import './register.scss';

interface OwnProps {}

type Props = OwnProps;

const RegisterPage: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    const register = () => {
        navigate('/');
    };

    return (
        <div className="page">
            <Card className="form">
                <div className="inputWrapper">
                    <TextField id="username" label="Username" variant="standard" className="input" />
                </div>

                <div className="inputWrapper">
                    <TextField id="email" label="Email" variant="standard" className="input" />
                </div>

                <div className="inputWrapper">
                    <TextField id="password" label="Password" variant="standard" className="input" />
                </div>

                <div className="registerWrapper">
                    <Button variant="contained" className="registerButton" onClick={register}>Register</Button>
                </div>

                <div className="info">
                    Already have an account?
                    <Link to="/login" className="loginLink"> Login </Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
