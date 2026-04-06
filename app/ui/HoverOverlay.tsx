'use client';

import { useState, useRef } from 'react';

interface HoverOverlayProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
}

export default function HoverOverlay({
    trigger,
    content,
}: HoverOverlayProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);


    return (
        <div
            ref={containerRef}
            className="relative inline-block pb-24"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <div>{trigger}</div>

            {isVisible && (
                <div
                    className={`absolute z-50 -translate-x-72 top-8 transition-opacity duration-200 opacity-100`}
                >
                    {content}
                </div>
            )}
        </div>
    );
}
