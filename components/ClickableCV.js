import React from 'react';
import styles from './ClickableCV.module.css';
import { Container } from 'react-bootstrap';

export default function ClickableCV() {

  return (
    <div className={styles.CVContainer}>
        <div className={styles.Presentation}>
            <h1 className={styles.AboutMe}>About Me</h1>
            <div className={styles.lines}>
              <span className={styles.MyName}>Hi! I am Pierrick Bournez . </span>
              <span>I{"'"}m an AI Research student specialised in <b>Deep Learning</b>, <b>Geometric Deep Learning</b> and <b>Theoretical deep Learning</b>. </span>

              <span className={styles.line}> I discovered that I really like everything related to 2D or 3D. </span>
              <span className={styles.line}>Feedback, suggestions or corrections are highly appreciated!</span>
            </div>
        </div>
        
      <a href="/pdf/CV.pdf" download className={styles.CVlink}> 
        <img src="/images/blured-CV-download.png" alt="CV" width="210" height="297" className={styles.CV} />
      </a>
      
    
    </div>
    
  );
}
