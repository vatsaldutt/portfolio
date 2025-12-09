//HomeContent.jsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function HomeContent({ fadeIn: parentFadeIn, simulateEducation }) {
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(false);

  // Run on first mount *and* whenever the user comes back to “/”
  useEffect(() => {
    // Only animate on the home path
    if (location.pathname === '/') {
      setFadeIn(false);
      const t = setTimeout(() => setFadeIn(true), 10);
      return () => clearTimeout(t);
    }
  }, [location.pathname]);

  return (
    <div className="maincontent">
      <div className="background" />
      <h1 className={`the fade-in-blur ${fadeIn ? 'show' : ''} delay-1`}>This is</h1>
      <h1 className={`firstname fade-in-blur ${fadeIn ? 'show' : ''} delay-2`}>VATSAL</h1>
      <h1 className={`firstname lastname fade-in-blur ${fadeIn ? 'show' : ''} delay-3`}>Dutt</h1>
      <div className="description-sec">
        <div className={`actionbuttons ${fadeIn ? 'show' : ''}`}>
          {/* <button className={`actionbutton fade-in-blur ${fadeIn ? 'show' : ''} delay-4`}>
            View Resume
          </button>
          <button className={`actionbutton metallic-button fade-in-blur ${fadeIn ? 'show' : ''} delay-5`}>
            <span className="gradient-text">Who even is this guy?</span>
            <span className="white-text">Who even is this guy?</span>
          </button> */}
          <p className={`about-me fade-in-blur ${fadeIn ? 'show' : ''} delay-4`}>
            Hi, I am a senior at Wake Forest High School. I love to combine art with engineering to create unique projects. My current focus is on Quantum AI development to achieve superintelligence. Check out all my work here!
          </p>
          <button
            onClick={simulateEducation}
            className={`simulate-button fade-in-blur ${fadeIn ? 'show' : ''} delay-5`}
          >
            Let's see it! 
          </button>
        </div>
      </div>
    </div>
  );
}
