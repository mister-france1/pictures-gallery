import React from 'react';
import Image from '../image/Image';
import styles from './imageList.module.scss';
import { ImageType } from '../../models/image';
import ImageWrapper from '../imageWrapper/ImageWrapper';

type ImageListProps = {
    images: ImageType[];
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
    return (
        <div className={styles.imageList}>
            {images.map(image => (
                <ImageWrapper key={image.picture_id} image={image}>
                    <Image src={image.resized25_url} />
                </ImageWrapper>
            ))}
        </div>
    );
}

export default ImageList;