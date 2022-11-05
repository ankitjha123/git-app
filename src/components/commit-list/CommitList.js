import moment from 'moment';
import React from 'react';
import styles from './commit-list.module.scss'

export function CommitList({commitData}) {
    
    return (
        <div className={styles.commitContainer}>
            <p className={styles.commitMsg}>{commitData.message}</p>
            <div><span className={styles.commitDate}>{moment.utc(commitData.date).format('MMMM D, LT')}</span> by {commitData.author}</div>
        </div>
    )
}