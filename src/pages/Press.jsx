import Section from '../components/common/sections/Section/Section';
import RevealWrapper from '../components/common/scroll/RevealWrapper';
import BlogCard from '../components/common/items/BlogCard/BlogCard';

const Press = ({ t }) => {
  const pressSection = t('pages.press', { returnObjects: true });
  const articles = pressSection.articles || [];

  return (
    <div className="content" style={{ backgroundColor: 'var(--tercery-white-color)', paddingBottom: '4rem' }}>
      <Section title={pressSection.title} subtitle={pressSection.subtitle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {articles.map((article, index) => (
            <RevealWrapper key={index} direction="up" delay={0.1 * (index + 1)}>
              <BlogCard
                image={article.image}
                title={article.title}
                paragraphs={article.paragraphs}
                link={article.link}
                date={article.date}
                source={article.source}
                sourceLink={article.sourceLink}
                horizontal={true}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
                buttonText={pressSection.readMore}
                zoomable={true}
              />
            </RevealWrapper>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Press;
