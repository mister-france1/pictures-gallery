import React from 'react';
import styles from './image.module.scss';

type ImageProps = {
    src: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ src, className }) => {
    return (
        <img src={src} alt="" className={styles.image} />
    );
}

export default Image;