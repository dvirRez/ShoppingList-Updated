import React from 'react';
import styles from './styles.css';

export default function Loading(props) {
    return (
        <div className={styles.cssload_thecube}>
            <div className={`${styles.cssload_cube} ${styles.cssload_c1}`}></div>
            <div className={`${styles.cssload_cube} ${styles.cssload_c2}`}></div>
            <div className={`${styles.cssload_cube} ${styles.cssload_c4}`}></div>
            <div className={`${styles.cssload_cube} ${styles.cssload_c3}`}></div>
        </div>
    );
}