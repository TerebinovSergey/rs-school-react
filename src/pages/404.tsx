import React from 'react';
import Link from 'next/link';
import { PagePaths } from '../utils/utils.ts';
import styles from '../styles/NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <>
      <h1>Not found</h1>
      <Link className={styles.link} href={PagePaths.Main}>
        Go home
      </Link>
    </>
  );
}

export default NotFoundPage;
