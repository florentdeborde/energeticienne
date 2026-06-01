import './Footer.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleLogoNavigation } from "../../utils/navigationUtils";
import NewspaperIcon from '@mui/icons-material/Newspaper';

const Footer = ({ t, menu, logoId = "home", legalInformationId = "mentions-legales", logoSrc, iframeSrc }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const fallbackLang = "fr";
  const currentLanguage = i18n.language ? i18n.language.split('-')[0] : fallbackLang;
  const baseMapSrc = iframeSrc[currentLanguage] || iframeSrc[fallbackLang];
  const mapSrc = baseMapSrc ? `${baseMapSrc}&hl=${currentLanguage}` : "";

  const logoItem = menu.find(item => item.id === logoId) || { path: "/" };

  const legalInformation = t(`menu.${legalInformationId}`);
  const legalInformationItem = menu.find(item => item.id === legalInformationId) || { path: "/mentions-legales" };

  const domain = t(`footer.domain`);
  const email = t(`footer.email`);
  const address = t(`footer.address`);
  const phone = t(`footer.phone`);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left side */}
        <div className="footer-left">
          <div className="footer-left-1">
            {/* Logo */}
            <Link to={logoItem.path} onClick={(e) => handleLogoNavigation(e, location.pathname, navigate, logoItem.path)} style={{ cursor: "pointer" }}>
              <img src={logoSrc} style={{ maxHeight: "200px" }} alt="Logo" className="footer-logo" />
            </Link>

            {/* Domain & legal */}
            <div className="domain-and-legal">
              {legalInformation && <Link className="a-footer" to={legalInformationItem.path}>{legalInformation}</Link>}
              {domain && <div className="footer-domain">{domain}</div>}
              {email && <a className="a-footer" href={"mailto:" + email}>{email}</a>}
            </div>
          </div>

          {/* Menus */}
          <div className="footer-left-2">
            <h2>{t("footer.title", { returnObjects: true })}</h2>
            <nav className="footer-menu">
              {menu.map((item, index) => (
                item.id === 'presse'
                  ? (
                    <Link key={index} to={item.path} className="footer-press-link">
                      <NewspaperIcon className="footer-press-icon" />
                      {t(`menu.${item.id}`)}
                    </Link>
                  )
                  : (
                    <Link key={index} className="footer-link" to={item.path}>{t(`menu.${item.id}`)}</Link>
                  )
              ))}
            </nav>
          </div>
        </div>

        {/* Right side */}
        <div className="footer-map">
          {/* Maps */}
          <iframe title="Location" src={mapSrc} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

          {/* Address & phone */}
          <div className="address-and-phone">
            {address &&
              <div className="footer-address">
                {address.split("\n").map((line, index) => (<div key={index}>{line}</div>))}
              </div>
            }

            {phone &&
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a className="a-footer" href={"tel:" + phone}>
                  <img src="/images/core/social_network/icons8-telephone-32.png" alt="tel" className="social-icon" style={{ verticalAlign: "middle", marginRight: "8px", maxWidth: "32px" }} />
                  {phone}
                </a>
              </div>
            }
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
