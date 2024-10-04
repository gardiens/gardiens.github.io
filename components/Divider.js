import React from 'react';

import styles from './Divider.module.css';

export default function Divider() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <span className={styles.divider} />
        <span className={styles.divider2} />
        <span className={styles.divider1} />
        
      </div>
    </>
  );
}
