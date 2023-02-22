import React, { FunctionComponent, ReactNode } from 'react';
import styles from './imageWrapper.module.scss';

interface OwnProps {
    children: ReactNode;
    url: string;
}

type Props = OwnProps;

const ImageWrapper: FunctionComponent<Props> = (props) => {
    const { url, children } = props;

    return (
        <div className={styles.imageWrapper}>
            {children}
            <div>
                <a href={url} target="_blank" className={styles.url} download >Download original image</a>
            </div>
        </div>
    );
};

export default ImageWrapper;
