import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Home';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';

const App: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
