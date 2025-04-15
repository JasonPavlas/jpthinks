import React, { useEffect, useState } from 'react';
import './Ball.css';

export function Ball({ startX }) {
  const [position, setPosition] = useState({ x: startX, y: -20 });
  const [opacity, setOpacity] = useState(1);
  
  useEffect(() => {
    let frame = 0;
    const gravity = 0.8;
    let velocity = 0;
    let hasBounced = false;
    let currentY = -20;
    
    // Random bounce height between 100 and 300 pixels
    const bounceVelocity = -(Math.random() * 15 + 10);

    const animate = () => {
      velocity += gravity;
      currentY += velocity;

      // Check for bounce when ball hits bottom of screen
      if (currentY > window.innerHeight - 20 && !hasBounced) {
        currentY = window.innerHeight - 20; // Reset to ground
        velocity = bounceVelocity;
        hasBounced = true;
      }

      setPosition({ x: startX, y: currentY });

      // Continue animation until ball goes off screen after bounce
      if (!hasBounced || (hasBounced && currentY < window.innerHeight + 50)) {
        frame = requestAnimationFrame(animate);
      } else {
        setOpacity(0);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [startX]);

  return (
    <div 
      className="ball" 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity
      }} 
    />
  );
} 