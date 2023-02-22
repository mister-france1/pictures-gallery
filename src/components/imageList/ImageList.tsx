import React from 'react';
import Image from '../image/Image';
import styles from './imageList.module.scss';
import { ImageType } from '../../models/image';

type ImageListProps = {
    images: ImageType[];
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
    return (
        <div className={styles.imageList}>
            {images.map(image => (
                <Image key={image.picture_id} src={image.resized_url} />
            ))}
        </div>
    );
}

export default ImageList;