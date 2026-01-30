import "./BlogCard.css";

const BlogCard = ({ image, title, description, link, date, handlePostClick }) => {
  return (
    <article className="blog-card">
      <div className="blog-card-link" onClick={() => {handlePostClick(link)}}>
        <img src={image} alt="" className="blog-card-image" />
        
        <div className="blog-card-content">
          <p className="blog-card-date">{date}</p>
          <h3 className="blog-card-title">{title}</h3>
          <p className="blog-card-description">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;