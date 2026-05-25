import React, { useRef, useState, useEffect } from "react";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check distance from bounds
      const distLeft = mouseX - rect.left;
      const distRight = rect.right - mouseX;
      const distTop = mouseY - rect.top;
      const distBottom = rect.bottom - mouseY;

      const isNear =
        mouseX >= rect.left - padding &&
        mouseX <= rect.right + padding &&
        mouseY >= rect.top - padding &&
        mouseY <= rect.bottom + padding;

      if (isNear) {
        setIsInside(true);
        // Calculate dynamic pull based on distance to center
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        setPosition({
          x: dx / strength,
          y: dy / strength,
        });
      } else {
        setIsInside(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [padding, strength]);

  const currentTransition = isInside ? activeTransition : inactiveTransition;

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ touchAction: "none" }}
    >
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: currentTransition,
          willChange: "transform",
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}
