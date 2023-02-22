import React from 'react';
import styles from './header.module.scss';

interface HeaderProps {
    username: string;
    logout: () => {};
}

const Header: React.FC<HeaderProps> = (props) => {
    const { username, logout} = props;

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>BigPictures.io</h1>
            <div className={styles.info}>
                <div className={styles.userNameWrapper}>
                    <p className={styles.userGreeting}>Hello,</p>
                    <p className={styles.userName}>{username}</p>
                </div>
                <div>
                    <button className={styles.logout} onClick={logout}>Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
