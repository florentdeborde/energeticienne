import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FeatureSection.css';

const FeatureSection = ({ id, title, items, buttonText, buttonLink, buttonTarget, image, imagePosition = 'right', imageSize = 'normal', enableLightbox = false, useAccordion = false, contentWithTitleOnly = null }) => {
  const hasImage = !!image;
  const isImageLeft = imagePosition === 'left';
  const [openIndexes, setOpenIndexes] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const toggleAccordion = (index) => {
    if (!useAccordion) return;
    setOpenIndexes((prev) => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  if (contentWithTitleOnly) {
    return (
      <section id={id} className="feature-section">
        <div className="feature-layout">
          <div className="feature-content">
            {title && (
              <div className="feature-title-wrapper">
                <h2 className="section-title">{title}</h2>
              </div>
            )}
            <div className="feature-custom-content">
              {contentWithTitleOnly}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id={id} className={`feature-section ${hasImage ? 'with-section-image' : ''}`}>
        <div className={`feature-layout ${!isImageLeft ? 'reverse' : ''}`}>
          {hasImage && (
            <div className={`feature-section-image ${imageSize === 'big' ? 'big' : ''}`}>
              <img src={image} loading="lazy" alt="Section visual" onClick={enableLightbox && window.innerWidth > 768 ? () => setIsLightboxOpen(true) : undefined} style={{ cursor: enableLightbox ? 'pointer' : 'default' }}/>
            </div>
          )}

          <div className="feature-content">
            {title && <h2 className="section-title">{title}</h2>}

            <div className="feature-list">
              {items.map((item, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                  <div className="feature-item" key={index}>
                    {typeof item.subtitle === 'string' && item.subtitle.trim().length > 0 && 
                      <h3 className={`feature-subtitle ${useAccordion ? 'accordion-toggle' : ''}`} onClick={() => toggleAccordion(index)}>
                        <span className="accordion-title-text">{item.subtitle}</span>
                        {useAccordion && <span className={`accordion-caret ${isOpen ? 'open' : ''}`} />}
                      </h3>
                    }
                    {(!useAccordion || isOpen) && item.paragraphs && item.paragraphs.length > 0 && (
                      <div className="feature-paragraphs">
                        {item.paragraphs.flatMap((p, i) => p.split('\n').map((line, j, arr) => (
                          <p className="feature-paragraph" key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: p === "" ? "&nbsp;" : line }} style={{paddingBottom: j < arr.length - 1 ? 0 : 'var(--feature-section-space)'}} />
                        )))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {buttonText && 
              <div className="feature-footer" style={{ marginTop: "3.75rem" }}>
                <Link to={buttonTarget ? `${buttonLink}#${buttonTarget}` : buttonLink} className="feature-button">{buttonText}</Link>
              </div>
            }
          </div>
        </div>
      </section>
      {enableLightbox && isLightboxOpen && (
        <div className="lightbox" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content">
            <img src={image} alt="Zoomed" className="lightbox-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureSection;
