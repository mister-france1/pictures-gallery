import React, { FunctionComponent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, TextField } from '@mui/material';
import './login.scss';

interface OwnProps {
}

type Props = OwnProps;

const LoginPage: FunctionComponent<Props> = (props) => {
    const navigate = useNavigate();

    const login = () => {
        navigate('/');
    };

    return (
        <div className="page">
            <Card className="form">
                <div className="inputWrapper">
                    <TextField id="username" label="Username" variant="standard" className="input" />
                </div>

                <div className="inputWrapper">
                    <TextField id="password" label="Password" variant="standard" className="input" />
                </div>

                <div className="loginWrapper">
                    <Button variant="contained" className="loginButton" onClick={login}>Login</Button>
                </div>

                <div className="info">
                    Need an account?
                    <Link to="/register" className="registerLink"> Register </Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
