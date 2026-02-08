import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";

import "./App.css";
import parameters from "./config/parameters";
import menu, { prepareMenuWithOverflow, prepareFlattenMenu } from './config/menu.js';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import LanguageSelector from './components/common/selectors/LanguageSelector/LanguageSelector';
import { ScrollToTopOrElement } from "./components/common/scroll/ScrollToTopOrElement";

import Home from "./pages/Home";
import LegalInformation from "./pages/LegalInformation";

const Maintenance = ({ t }) => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", textAlign: "center", width: "80%", maxWidth: "400px" }}>
        <h2 className="content-h2-logo-color">{t("pages.maintenance.title")}</h2>
        <p>{t("pages.maintenance.text")}</p>
      </div>
    </div>
  );
};

const App = () => {
  const { t } = useTranslation();
  const { mainMenu, overflowMenu } = prepareMenuWithOverflow(menu, parameters.globalVisibleDesktopMenus);
  const { headerFlattenMenu, footerFlattenMenu } = prepareFlattenMenu(menu);

  const siteActive = parameters.globalWebsiteActive;
  if (!siteActive) {
    // 🚧 Maintenance mode
    return (
      <Maintenance
        t={t}
        menu={menu}
        headerFlattenMenu={headerFlattenMenu}
        footerFlattenMenu={footerFlattenMenu}
      />
    );
  }

  return (
    <Router>
      <ScrollToTopOrElement />
      <Header t={t} menu={mainMenu} overflowMenu={overflowMenu} flattenMenu={headerFlattenMenu} logoSrc={parameters.globalLogo} centeredLimitMobileMenus={parameters.globalCenteredLimitMobileMenus} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/mentions-legales" element={<LegalInformation t={t} />} />
        </Routes>
      </main>
      <Footer t={t} menu={footerFlattenMenu} logoSrc={parameters.globalLogo} iframeSrc={parameters.globalIframeSrc} />
      <LanguageSelector />
    </Router>
  );
};

export default App;