import React, { FunctionComponent, ReactNode } from 'react';
import styles from './imageWrapper.module.scss';
import { ImageType } from '../../models/image';

interface OwnProps {
    children: ReactNode;
    image: ImageType;
}

type Props = OwnProps;

const ImageWrapper: FunctionComponent<Props> = (props) => {
    const { image, children } = props;

    return (
        <div className={styles.imageWrapper}>
            {children}
            <div className={styles.imageLinksWrapper}>
                <a href={image.url} target="_blank" className={styles.url} download rel="noreferrer" >100%</a>
                <a href={image.resized50_url} target="_blank" className={styles.url} download rel="noreferrer" >50%</a>
                <a href={image.resized25_url} target="_blank" className={styles.url} download rel="noreferrer" >25%</a>
            </div>
        </div>
    );
};

export default ImageWrapper;
