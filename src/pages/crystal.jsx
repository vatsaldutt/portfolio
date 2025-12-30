//TechTheatrePage.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/crystal.css';

export default function TechTheatrePage() {
    const [animate, setAnimate] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const [isCollapsing, setIsCollapsing] = useState(false);
    const [transformStr, setTransformStr] = useState('');
    const [expandedSize, setExpandedSize] = useState({ w: 0, h: 0 });
    const [backdropState, setBackdropState] = useState('');
    const [fadeIn, setFadeIn] = useState(false);

    // Run on first mount *and* whenever the user comes back to “/”
    useEffect(() => {
        // Only animate on the home path
        if (location.pathname === '/crystal') {
            setFadeIn(false);
            const t = setTimeout(() => setFadeIn(true), 10);
            return () => clearTimeout(t);
        }
    }, [location.pathname]);

    useEffect(() => setAnimate(true), []);
    useEffect(() => {
        document.body.style.overflow = (activeCard !== null || isCollapsing) ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [activeCard, isCollapsing]);

    useEffect(() => {
        if (activeCard !== null) {
            setBackdropState('');
            requestAnimationFrame(() => setBackdropState('fade-in'));
        }
    }, [activeCard]);

    useEffect(() => { if (isCollapsing) setBackdropState('fade-out'); }, [isCollapsing]);

    useEffect(() => {
        document.body.classList.toggle('card-open', activeCard !== null && !isCollapsing);
    }, [activeCard, isCollapsing]);

    // ONLY opens when no card is active; never collapses here
    const handleCardClick = (i, e) => {
        if (activeCard !== null) return;        // do nothing if already open
        const rect = e.currentTarget.getBoundingClientRect();
        const newH = window.innerHeight - TOP_GAP;
        const newW = rect.width * newH / rect.height;
        const dx = window.innerWidth / 2 - newW / 2 - rect.left;
        const dy = TOP_GAP - rect.top;

        setExpandedSize({ w: newW, h: newH });
        setTransformStr(`translate(${dx}px, ${dy}px)`);
        setActiveCard(i);
    };

    const collapse = () => {
        if (activeCard === null || isCollapsing) return;
        setIsCollapsing(true);
        setTransformStr('none');
        setExpandedSize({ w: CARD_W, h: CARD_H });
    };

    const onTransitionEnd = e => {
        if (isCollapsing && e.propertyName === 'transform') {
            setActiveCard(null);
            setIsCollapsing(false);
        }
    };

    return (
        <>
            {/* BACKDROP: clicking it collapses */}
            {(activeCard !== null || isCollapsing) && (
                <div
                    className={`expander-backdrop ${backdropState}`}
                    onClick={collapse}
                />
            )}

            {/* HERO SECTION (unchanged) */}
            <div className="page-content">
                <div className={`overview ${animate ? 'show' : ''}`}>
                    <div className="image-container blurred-robot">
                        <img className="fade-item delay-0" src="/CRYSTAL/robotic arm background.png" alt="background" />
                    </div>
                    <div className="crystal-text-overlay">
                        <h2 className="fade-item delay-1 title title-big">CRYSTAL</h2>
                        {/* <h2 className="fade-item delay-2 title title2">Begins</h2> */}
                    </div>
                    <p className={`about-me crystal-subtitle delay-3 fade-in-blur ${fadeIn ? 'show' : ''}`}>
                        An evolving autonomous intelligence that moved from software cognition to embodied action.
                    </p>
                </div>
                <div className={`lead-info delay-4 fade-in-blur ${fadeIn ? 'show' : ''}`}>
                    <img class="lead-image" src="CRYSTAL/robotic_arm.png" alt="CRYSTAL R1" />
                </div>
            </div>
            <div className="secondsection">

            </div>

        </>
    );
}
