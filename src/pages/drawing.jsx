import React, { useEffect, useState } from 'react';
import '../stylesheets/drawing.css';

export default function Drawing() {
    const [showTitle, setShowTitle] = useState(false);
    const [blurBg, setBlurBg] = useState(false);

    useEffect(() => {
        // Title appears after background is visible
        const t1 = setTimeout(() => {
            setShowTitle(true);

            // Blur background immediately after title appears
            const t2 = setTimeout(() => {
                setBlurBg(true);
            }, 50);

            return () => clearTimeout(t2);
        }, 1000);

        return () => clearTimeout(t1);
    }, []);

    return (
        <div className="drawing-page">
            {/* Background */}
            <div
                className={`drawing-bg ${blurBg ? 'blurred' : ''}`}
            />

            {/* Title */}
            <div className={`drawing-title-wrapper ${showTitle ? 'show' : ''}`}>
                <h2 className="drawing-title">DRAWINGS</h2>
            </div>
        </div>
    );
}
