import React from 'react';
import styles from './ClickableCV.module.css';

export default function ClickableCV() {

  return (
    <div className={styles.CVContainer}>
        <div className={styles.Presentation}>
            <h1 className={styles.AboutMe}>About Me</h1>
            <div className={styles.lines}>
              <span className={styles.MyName}>Hi! It{"'"}s Pierrick. </span>
              <span>I{"'"}m an AI Research student specialised in <b>Deep Learning</b>, <b>Geometric Deep Learning</b> and <b>Theoretical deep Learning</b>. </span>

              <span className={styles.line}>I like pushing the boundaries of the State Of The Art and combining <b>Deep Learning</b>, <b>Algorithmics Methods</b> and <b>Maths Principles</b> to build powerful solutions for specific problems.</span>
              <span className={styles.line}>This website is a showcase of my numerous projects.</span>
            </div>
        </div>
      <a href="/pdf/CV.pdf" download className={styles.CVlink}> 
        <img src="/images/blured-CV-download.png" alt="CV" width="210" height="297" className={styles.CV} />
      </a>
    </div>
  );
}
