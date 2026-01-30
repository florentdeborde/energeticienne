import FeatureSection from '../components/common/sections/Feature/FeatureSection';

const LegalInformation = ({t}) => {
    const featureSection = t("pages.legalInformation.featureSection", { returnObjects: true });

    return (
      <div className="content" style={{ backgroundColor: "var(--tercery-white-color)" }}>
        <FeatureSection
          id={featureSection.target}
          title={featureSection.title}
          items={featureSection.items}
        />
      </div>
    )
};

export default LegalInformation;