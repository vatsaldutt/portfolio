//App.jsx

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Routes,
    Route,
    Link,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import '../stylesheets/style.css';
import TechTheatrePage from '../pages/TechTheatrePage';
import CRYSTAL from '../pages/CRYSTAL/crystal';
import HomeContent from '../pages/HomeContent';
import AboutPage from '../pages/AboutPage';
import ReflectionPage from '../pages/ReflectionPage';
import CinemaPage from '../pages/cinema';
import { label } from 'framer-motion/client';


function AnimatedSwitch({ children }) {
    const location = useLocation();
    const [displayedLoc, setDisplayedLoc] = useState(location);
    const [animating, setAnimating] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (location !== displayedLoc) {
            setAnimating(true);
            timeoutRef.current = setTimeout(() => {
                setDisplayedLoc(location);
                setAnimating(false);
            }, 300);
            return () => clearTimeout(timeoutRef.current);
        }
    }, [location, displayedLoc]);

    return (
        <div
            key={displayedLoc.pathname}
            className={`page-wrapper ${animating ? 'slide-out-left' : 'slide-in-right'}`}
        >
            <Routes location={displayedLoc}>{children}</Routes>
        </div>
    );
}

function RouteListener({ onRouteChange }) {
    const location = useLocation();
    useEffect(() => onRouteChange(location), [location]);
    return null;
}

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [fadeIn, setFadeIn] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [slideDirection, setSlideDirection] = useState('right');
    const [highlightItem, setHighlightItem] = useState(null);
    const hoverTimeout = useRef(null);
    const simulateTimeouts = useRef([]);

    // drive homepage fade on every route change
    useEffect(() => {
        setFadeIn(false);
        const t = setTimeout(() => setFadeIn(true), 10);
        return () => clearTimeout(t);
    }, [location.pathname]);

    const handleRouteChange = () => setActiveTab(null);

    const handleTabEnter = useCallback(
        (tab) => {
            clearTimeout(hoverTimeout.current);
            if (tab !== activeTab) {
                const tabs = Object.keys(dropdownContent);
                const dir = tabs.indexOf(tab) < tabs.indexOf(activeTab) ? 'left' : 'right';
                setSlideDirection(dir);
                setActiveTab(tab);
            }
        },
        [activeTab]
    );
    const handleMouseLeaveAll = () => {
        hoverTimeout.current = setTimeout(() => setActiveTab(null), 200);
    };

    useEffect(() => {
        return () => simulateTimeouts.current.forEach(clearTimeout);
    }, []);

    const simulateEducation = () => {
        handleTabEnter('Engineering');
        const t1 = setTimeout(() => {
            setHighlightItem('CRYSTAL');
            const t2 = setTimeout(() => {
                setHighlightItem(null);
                navigate('/crystal');
            }, 700);
            simulateTimeouts.current.push(t2);
        }, 700);
        simulateTimeouts.current.push(t1);
    };

    const dropdownContent = {
        arts: [
            {
                heading: 'Fine Arts',
                items: [
                    { label: 'Drawings', href: '/drawings', description: "Hyper-realistic pencil drawings" },
                    { label: 'Cinematography', href: '/cinema', description: "Cinematography and filmmaking projects" },
                    { label: 'Calligraphy', href: '/calligraphy', description: "Custom lettering designs" },
                ],
            },
            {
                heading: 'Creative Expression',
                items: [
                    { label: 'Music', href: '/music', description: "Percussive fingerstyle guitar arrangements" },
                    { label: 'Culinary', href: '/culinary', description: "My best dishes" },
                ],
            },
        ],
        Engineering: [
            {
                heading: '',
                items: [
                    { label: 'CRYSTAL', href: '/crystal', description: "View my biggest project; Seven years of work in AI development" },
                    { label: 'BetterGPT', href: '/bettergpt', description: "Use CRYSTAL's public version" },
                    { label: 'Future Vision', href: '/future', description: "See where this project is going; CRYSTAL's next milestones" },
                    // { label: 'Miscelleneous Projects', href: '/miscelleneous', description: "Other awesome projects!" },
                ],
            },
            {
                heading: '',
                items: [
                    { label: 'Software', href: '/software', description: "Various other software programs I have made" },
                    { label: 'Robotics', href: '/robotics', description: "View all my robotics projects" },
                    // { label: 'Quantum Computing', href: '/quantum', description: "Current progress in my future vision; My startup" },
                ],
            },
        ],
        academics: [
            {
                heading: 'Classes',
                items: [
                    { label: 'Tech Theatre', href: '/techtheatre', description: 'Class projects for Tech Theatre' },
                    { label: 'TED', href: '/ted', description: 'Projects from Technology Engineering and Design' },
                ],
            },
            {
                heading: 'Honors',
                items: [
                    { label: 'Leadership', href: '/leadership', description: 'Leadership roles in clubs' },
                    { label: 'Awards', href: '/awards', description: 'Recognition for achievements' },
                ],
            },
        ],
    };

    return (
        <>
            <RouteListener onRouteChange={handleRouteChange} />

            <div className={`overlay ${fadeIn ? 'hidden' : ''}`} />
            <div className={`mainapp ${fadeIn ? 'visible' : 'invisible'}`}>
                <nav>
                    <Link to="/" id="logo">
                        <img src="/home/logo.png" alt="Logo" />
                        <div>
                            <p className="logotitle">Vatsal</p>
                            <p id="sub-title">Portfolio</p>
                        </div>
                    </Link>
                    <div className="nav-wrapper">
                        <ul id="navlist">
                            <li className="navitem" onMouseEnter={handleMouseLeaveAll}>
                                <Link to="/about" className="navlink"><span>About</span></Link>
                            </li>
                            {Object.keys(dropdownContent).map((tab) => (
                                <li
                                    key={tab}
                                    className={`navitem${activeTab === tab ? ' active' : ''}`}
                                    onMouseEnter={() => handleTabEnter(tab)}
                                    onMouseLeave={handleMouseLeaveAll}
                                >
                                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div
                    className={`nav-dropdown-panel ${activeTab ? 'visible' : 'hidden'}`}
                    onMouseEnter={() => clearTimeout(hoverTimeout.current)}
                    onMouseLeave={handleMouseLeaveAll}
                >
                    <div className="menu-container">
                        <div className="menu-inside-styler">
                            {activeTab && dropdownContent[activeTab] && (
                                <div
                                    key={`${activeTab}-${slideDirection}`}
                                    className={`menu-content-animated slide-fade-in-${slideDirection}`}
                                >
                                    {dropdownContent[activeTab].map((col) => (
                                        <div key={col.heading} className="menu-column">
                                            <h4 className="column-heading">{col.heading}</h4>
                                            {col.items.map(({ label, href, description }) => (
                                                <Link
                                                    key={label}
                                                    to={href}
                                                    className={`column-link${highlightItem === label ? ' highlight' : ''}`}
                                                >
                                                    <div className="link-label">{label}</div>
                                                    {description && <div className="link-desc">{description}</div>}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* <span className="notice">
                            <strong>Like the website? </strong> 728 hours of designing, check out the code on <a class="reflection-button" style={{transform: 'none'}} href="https://github.com/vatsaldutt/portfolio" target="_blank" rel="noopener">GitHub</a>
                        </span> */}
                    </div>
                </div>

                <AnimatedSwitch>
                    <Route path="/techtheatre" element={<TechTheatrePage />} />
                    <Route path="/crystal" element={<CRYSTAL />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/reflection" element={<ReflectionPage />} />
                    <Route path="/cinema" element={<CinemaPage />} />
                    <Route path="/" element={
                        <HomeContent
                            fadeIn={fadeIn}
                            simulateEducation={simulateEducation}
                        />
                    } />
                </AnimatedSwitch>

            </div>
        </>
    );
}

