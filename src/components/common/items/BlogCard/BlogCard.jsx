import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({
  image,
  title,
  description,
  paragraphs,
  link,
  date,
  source,
  horizontal = false,
  imagePosition = "left",
  buttonText,
  handlePostClick
}) => {
  const isExternal = link && (link.startsWith("http") || link.startsWith("//"));

  const renderContent = () => (
    <>
      {image && (
        <div className="blog-card-image-wrapper">
          <img src={image} alt={title || ""} className="blog-card-image" loading="lazy" />
        </div>
      )}
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          {source && <span className="blog-card-source">{source}</span>}
          {source && date && <span className="blog-card-meta-separator">•</span>}
          {date && <span className="blog-card-date">{date}</span>}
        </div>
        
        <h3 className="blog-card-title">{title}</h3>
        
        {paragraphs && paragraphs.length > 0 ? (
          <div className="blog-card-paragraphs">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="blog-card-description">{paragraph}</p>
            ))}
          </div>
        ) : (
          description && <p className="blog-card-description">{description}</p>
        )}

        {buttonText && link && (
          <div className="blog-card-footer">
            <span className="blog-card-button">{buttonText}</span>
          </div>
        )}
      </div>
    </>
  );

  const cardClassName = [
    "blog-card",
    horizontal ? "horizontal" : "",
    horizontal && imagePosition === "right" ? "reverse" : ""
  ].filter(Boolean).join(" ");

  // 1. External link: Wrap entire card in an anchor tag
  if (isExternal) {
    return (
      <a
        href={link}
        className={cardClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {renderContent()}
      </a>
    );
  }

  // 2. Custom click handler: Wrap in article with click handler
  if (handlePostClick) {
    return (
      <article
        className={cardClassName}
        onClick={() => handlePostClick(link)}
        style={{ cursor: "pointer" }}
      >
        {renderContent()}
      </article>
    );
  }

  // 3. Internal link: Wrap entire card in React Router Link
  if (link) {
    return (
      <Link to={link} className={cardClassName}>
        {renderContent()}
      </Link>
    );
  }

  // 4. Default: Standard static article element
  return (
    <article className={cardClassName}>
      {renderContent()}
    </article>
  );
};

export default BlogCard;