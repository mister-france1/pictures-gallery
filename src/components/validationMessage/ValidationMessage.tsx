import React, { FunctionComponent } from 'react';
import styles from './validationMessage.module.scss';

interface OwnProps {
    message?: string;
}

type Props = OwnProps;

const ValidationMessage: FunctionComponent<Props> = (props) => {
    const {message} = props;

    return (
        <div className={styles.validationMessage}>
            {message ? <div>{message}</div> : null}
        </div>
    );
};

export default ValidationMessage;
