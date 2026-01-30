import { useEffect, useRef, useState } from "react";
import "./GoogleReviews.css";

const GoogleReviews = ({ src, appClass, pUnavailable }) => {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(true); // Assume widget should show

  useEffect(() => {
    // Load the Elfsight script if not already present
    if (!document.getElementById("elfsight-script")) {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.id = "elfsight-script";
      document.body.appendChild(script);
    }

    // After 2 seconds, check if the widget appeared
    const timer = setTimeout(() => {
      if (containerRef.current && containerRef.current.children.length === 0) {
        // Widget didn't render → hide component
        setVisible(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [src]);

  // If not visible, render fallback message
  if (!visible) {
    return (
      <div className="google-reviews-fallback">
        <p>
          {pUnavailable}
        </p>
      </div>
    );
  }

  return (
    <div className="google-reviews">
      <div ref={containerRef} className={appClass} data-elfsight-app-lazy></div>
    </div>
  );
};

export default GoogleReviews;
