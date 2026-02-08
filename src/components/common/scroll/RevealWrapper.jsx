import { useEffect, useRef, useState } from "react";
import "./RevealWrapper.css";

/**
 * Reveals elements with a smooth scroll-in animation.
 *
 * @param {ReactNode} children - The content to animate.
 * @param {string} [direction='up'] - Direction of animation: 'up', 'down', 'left', or 'right'.
 * @param {number} [delay=0] - Animation delay in seconds.
 * @param {number} [duration=0.8] - Animation duration in seconds.
 * @param {number} [threshold=0.2] - Visibility threshold (0–1) to trigger the animation.
 */
const RevealWrapper = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  threshold = 0.2,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(ref.current); // Trigger once
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${direction}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default RevealWrapper;
