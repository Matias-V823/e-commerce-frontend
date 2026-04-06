'use client';

import { useState, useRef } from 'react';

interface HoverOverlayProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export default function HoverOverlay({ trigger, content }: HoverOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setIsVisible(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger}

      {isVisible && (
        <>
          <div className="absolute right-0 top-full h-3 w-full" />
          <div className="absolute right-0 top-full pt-3 z-50 shadow-sm">
            {content}
          </div>
        </>
      )}
    </div>
  );
}
