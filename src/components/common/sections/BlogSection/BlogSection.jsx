import "./BlogSection.css";
import BlogCard from "../../items/BlogCard/BlogCard"

const BlogSection = ({blogPosts, handlePostClick}) => {

  return (
    <section className="blog-section">
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            date={post.date}
            image={post.image}
            title={post.title}
            description={post.description}
            link={post.link}
            handlePostClick={handlePostClick}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;