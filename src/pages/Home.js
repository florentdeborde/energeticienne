import FeatureSection from '../components/common/sections/Feature/FeatureSection';
import FeatureCarouselSection from '../components/common/sections/Feature/FeatureCarouselSection';
import Banner from '../components/common/sections/Banner/Banner';
import CardSection from '../components/common/sections/Card/CardSection';
import GoogleReviews from '../components/GoogleReviews/GoogleReviews';
import RevealWrapper from '../components/common/scroll/RevealWrapper';
import parameters from '../config/parameters';

const Home = ({t}) => {
    const bannerSection = t("pages.home.banner", { returnObjects: true });
    const featureSection = t("pages.home.featureSection", { returnObjects: true });
    const cardSection = t("pages.home.cardSection", { returnObjects: true });
    const featureSectionWia = t("pages.home.featureSectionWia", { returnObjects: true });
    const featureSectionSeance = t("pages.home.featureSectionSeance", { returnObjects: true });
    const featureSectionOrganiserSeance = t("pages.home.featureSectionOrganiserSeance", { returnObjects: true });
    const featureSectionAvis = t("pages.home.featureSectionAvis", { returnObjects: true });
    const googleReviews =  t("pages.home.googleReviews", { returnObjects: true });

    return (
      <div className="content">
        <Banner 
          title={bannerSection.title}
          subtitle={bannerSection.subtitle}
          imageUrl="/images/site/cover/buddha-1177009__480-e1669732126999.jpg"
        />

        <RevealWrapper direction="up" delay={0.2}>
          <FeatureSection
            title={featureSection.title}
            items={featureSection.items}
            image="/images/site/carousel_home/5-1.jpg"
            imagePosition={'left'}
          />
        </RevealWrapper>


        <RevealWrapper direction="up" delay={0.2}>
          <CardSection
            id={cardSection.target}
            title={cardSection.title}
            items={cardSection.items}
          />
        </RevealWrapper>


        <RevealWrapper direction="up" delay={0.2}>
          <FeatureSection
            id={featureSectionWia.target}
            title={featureSectionWia.title}
            items={featureSectionWia.items}
            image={"/images/site/carousel_home/DSC_7483-scaled-e1670341387444.jpg"}
            imagePosition='right'
          />
        </RevealWrapper>


        <RevealWrapper direction="up" delay={0.2}>
          <FeatureCarouselSection
            id={featureSectionSeance.target}
            title={featureSectionSeance.title}
            images={[
              "/images/site/carousel_home/3-1.jpg",
              "/images/site/carousel_home/4-1.jpg",
              "/images/site/carousel_home/6-1.jpg",
              "/images/site/carousel_home/7-1.jpg"
            ]}
            imagePosition="left"
            imageSize="big"
            items={featureSectionSeance.items}
          />
        </RevealWrapper>


        <RevealWrapper direction="up" delay={0.2}>
          <FeatureSection
            id={featureSectionOrganiserSeance.target}
            title={featureSectionOrganiserSeance.title}
            items={featureSectionOrganiserSeance.items}
          />
        </RevealWrapper>

        <RevealWrapper direction="up" delay={0.2}>
          <FeatureSection
            id={featureSectionAvis.target}
            title={featureSectionAvis.title}
            contentWithTitleOnly={
              <GoogleReviews
              src="https://elfsightcdn.com/platform.js"
              appClass={parameters.globalElfsightAppClass}
              pUnavailable={googleReviews.pUnavailable}
            />
            }
          />
        </RevealWrapper>

      </div>
    )
};

export default Home;