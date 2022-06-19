import styles from './Loading.module.scss';

export default function Loading() {
    return <main className={styles.root}>
        <div className={styles.spinner}>
            <div className={styles["double-bounce1"]}/>
            <div className={styles["double-bounce2"]}/>
        </div>
    </main>
}
