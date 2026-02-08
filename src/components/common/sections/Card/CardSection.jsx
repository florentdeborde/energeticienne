import './CardSection.css';

const CardSection = ({ id, title, items }) => {
  return (
    <section id={id} className="card-section">
      {title && <h2 className="card-section-title">{title}</h2>}

      <div className="card-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className="card-item"
            style={{ backgroundColor: item.color }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardSection;
