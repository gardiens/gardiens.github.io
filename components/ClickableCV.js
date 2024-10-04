import React from 'react';
import { useState } from 'react';
import styles from './ClickableCV.module.css';

export default function ClickableCV() {

  return (
    <div className={styles.CVContainer}>
        <div className={styles.Presentation}>
            <h1 className={styles.AboutMe}>About Me</h1>
            <div className={styles.lines}>
              <span className={styles.MyName}>Hi! I{"'"}m Julien. </span>
              <span>I{"'"}m an AI Research Scientist specialised in <b>Reinforcement Learning</b>, <b>Pathfinding</b> and <b>Optimization Methods</b>. </span>
              <span className={styles.line}>I value <u>Open Source</u> and <u>Open Knowledge</u>. </span>
              <span className={styles.line}>I like pushing the boundaries of the State Of The Art and combining <b>Deep Learning</b>, <b>Algorithmics Methods</b> and <b>Maths Principles</b> to build powerful solutions for specific problems.</span>
              <span className={styles.line}>This website is for me a way to better share my projects and reach more people.</span>
            </div>
        </div>
      <a href="/pdf/CV.pdf" download className={styles.CVlink}> 
        <img src="/images/blured-CV-download.png" alt="CV" width="210" height="297" className={styles.CV} />
      </a>
    </div>
  );
}
