import React, { useEffect, useState } from 'react';
import '../stylesheets/cinema.css';

export default function Cinema() {
    const [showTitle, setShowTitle] = useState(false);
    const [showGradient, setShowGradient] = useState(false);

    useEffect(() => {
        // Title appears 2s after video starts
        const titleTimer = setTimeout(() => {
            setShowTitle(true);

            // Gradient appears 200ms AFTER title
            const gradientTimer = setTimeout(() => {
                setShowGradient(true);
            }, 200);

            return () => clearTimeout(gradientTimer);
        }, 2000);

        return () => clearTimeout(titleTimer);
    }, []);

    return (
        <div className="page-content cinema-page">
            <div className="video-wrapper">
                <video
                    src="/cinematography/output.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Gradient reveal */}
                <div className={`cinema-gradient ${showGradient ? 'show' : ''}`} />

                {/* Title */}
                <div className="cinema-text-overlay">
                    <h2 className={`cinema-title ${showTitle ? 'show' : ''}`}>
                        CINEMATOGRAPHY
                    </h2>
                </div>
            </div>
        </div>
    );
}
