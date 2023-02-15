import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.scss';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    return (
        <div className={styles.page}>
            <h1>This is the home page.</h1>
            <p>
                <Link to="/login">Go to the Login Page!</Link>
                <br/>
                <br/>
                <br/>
                <Link to="/register">Go to the Register Page!</Link>
            </p>
        </div>
    );
};

export default HomePage;
