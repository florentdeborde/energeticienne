import "./Section.css";

const Section = ({ id, title, subtitle, className = "", children }) => {
  return (
    <section id={id} className={`site-section ${className}`}>
      <div className="section-container">
        {title && (
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="section-content">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
