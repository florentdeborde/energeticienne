import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./FeatureSection.css";

const FeatureCarouselSection = ({
  id,
  title,
  items,
  buttonText,
  buttonLink,
  buttonTarget,
  images = [],
  imagePosition = "right",
  imageSize = "normal",
  enableLightbox = false,
  useAccordion = false,
  autoSlide = true,
  slideInterval = 5000,
}) => {
  const hasImages = images.length > 0;
  const isImageLeft = imagePosition === "left";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndexes, setOpenIndexes] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  const toggleAccordion = (index) => {
    if (!useAccordion) return;
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const clearAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoSlide = useCallback(() => {
    clearAutoSlide();
    if (!autoSlide || images.length <= 1) return;
  
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, slideInterval);
  }, [autoSlide, images.length, slideInterval]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    startAutoSlide();
  }, [images.length, startAutoSlide]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    startAutoSlide();
  }, [images.length, startAutoSlide]);

  // 🧭 Observe visibility of section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 } // visibility >= 30 %
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 🕐 Start / stop carrousel depending on visibility
  useEffect(() => {
    if (isVisible) {
      startAutoSlide();
    } else {
      clearAutoSlide();
    }
    return () => clearAutoSlide();
  }, [isVisible, startAutoSlide]);

  return (
    <>
      <section id={id} className="feature-section" ref={sectionRef}>
        <div className={`feature-layout ${!isImageLeft ? "reverse" : ""}`}>
          {hasImages && (
            <div className={`feature-carousel ${imageSize === "big" ? "big" : ""}`}>
              <div 
                className="carousel-container"
                onMouseEnter={clearAutoSlide}
                onMouseLeave={startAutoSlide}
              >
                <div
                  className="carousel-track"
                  ref={trackRef}
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="carousel-image"
                      onClick={
                        enableLightbox && window.innerWidth > 768
                          ? () => setIsLightboxOpen(true)
                          : undefined
                      }
                      style={{
                        cursor: enableLightbox ? "pointer" : "default",
                      }}
                    />
                  ))}
                </div>

                {/* Boutons */}
                {images.length > 1 && (
                  <>
                    <button className="carousel-btn prev" onClick={prevSlide}>
                      ‹
                    </button>
                    <button className="carousel-btn next" onClick={nextSlide}>
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Dots */}
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentIndex ? "active" : ""}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="feature-content">
            {title && <h2 className="section-title">{title}</h2>}

            <div className="feature-list">
              {items.map((item, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                  <div className="feature-item" key={index}>
                    {/* Subtitle check with trim */}
                    {typeof item.subtitle === "string" && item.subtitle.trim().length > 0 && (
                      <h3
                        className={`feature-subtitle ${useAccordion ? "accordion-toggle" : ""}`}
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="accordion-title-text">{item.subtitle}</span>
                        {useAccordion && <span className={`accordion-caret ${isOpen ? "open" : ""}`} />}
                      </h3>
                    )}

                    {/* Paragraphs with split and padding only on last line */}
                    {(!useAccordion || isOpen) && item.paragraphs && item.paragraphs.length > 0 && (
                      <div className="feature-paragraphs">
                        {item.paragraphs.flatMap((p, i) =>
                          p.split("\n").map((line, j, arr) => (
                            <p
                              className="feature-paragraph"
                              key={`${i}-${j}`}
                              dangerouslySetInnerHTML={{ __html: line === "" ? "&nbsp;" : line }}
                              style={{ paddingBottom: j < arr.length - 1 ? 0 : "var(--feature-section-space)" }}
                            />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {buttonText && (
              <div className="feature-footer" style={{ marginTop: "3.75rem" }}>
                <Link
                  to={
                    buttonTarget
                      ? `${buttonLink}#${buttonTarget}`
                      : buttonLink
                  }
                  className="feature-button"
                >
                  {buttonText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {enableLightbox && isLightboxOpen && (
        <div className="lightbox" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content">
            <img
              src={images[currentIndex]}
              alt="Zoomed"
              className="lightbox-image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureCarouselSection;
