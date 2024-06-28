import Link from 'next/link';

import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <>
      <div>
        <div className={styles.bgImage}>
          <div>
            <Link href="/" className={styles.imageLink}>
              <img src="logo.png" alt="Hearthstone logo" />
            </Link>
          </div>
        </div>

        <div className={styles.parchment} />
      </div>

      <div className={styles.contentSection}>
        <h1 className={styles.title}>404</h1>
        <h3 className={styles.subtitle}>Page not found.</h3>

        <p>
          It was probably a temporal rift, or unstable apparatus malfunction, or arcane spillover,
          or dragon attack, or fractured political agreement, or…
        </p>

        <div>
          <img src="errorBg.png" alt="Page not found" className={styles.errorImage} />
        </div>
      </div>
    </>
  );
};

export default NotFound;
