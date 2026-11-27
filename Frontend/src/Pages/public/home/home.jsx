
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

export const Home = () => {

  // Background slideshow images
  const slides = [
    '/images/campus1.jpg',
    '/images/campus2.jpg',
    '/images/campus3.jpg',
    '/images/campus4.jpg',
    '/images/campus5.jpg'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Change background every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previousSlide) =>
        (previousSlide + 1) % slides.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={styles['home-page']}>

      {/* HERO SECTION */}
      <main className={styles.hero}>

        {/* Background Slideshow */}
        <div className={styles['hero-slideshow']}>

          {slides.map((image, index) => (
            <div
              key={image}
              className={`${styles['hero-slide']} ${
                currentSlide === index ? styles.active : ''
              }`}
              style={{
                backgroundImage: `url("${image}")`
              }}
            />
          ))}

        </div>

        {/* Dark Overlay */}
        <div className={styles['hero-overlay']}></div>

        {/* Hero Content */}
        <div className={`${styles.container} ${styles['hero-container']}`}>

          <div className={styles['hero-content']}>

            <span className={styles['hero-badge']}>
              WALLAGA UNIVERSITY
            </span>

            <h1>
              Your Choice Today,
              <br />
              Your Profession
              <br />
              Tomorrow.
            </h1>

            <p>
              A secure and transparent system for Pre-Engineering
              students to explore departments, submit preferences,
              and follow official placement results.
            </p>

            {/* onclick will be added here for login */}

            <a href="/login" className={styles['hero-button']}>
              Login to the system
              <span>→</span>
            </a>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Home;
