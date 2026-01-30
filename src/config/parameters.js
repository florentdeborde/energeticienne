const parameters = {
    // general
    globalLogo: '/images/site/logo/LOGO-VECTORIEL2.svg',
    globalVisibleDesktopMenus: 5,
    globalCenteredLimitMobileMenus: 6,

    // env. secrets
    globalWebsiteActive: process.env.REACT_APP_WEBSITE_ACTIVE === 'true',
    globalDefaultLang: process.env.REACT_APP_DEFAULT_LANG || 'fr',

    // google
    globalIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.189273165174!2d-0.3640733131359911!3d48.587074697287136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48098d0098ea4521%3A0xdf6505f75b2c4d16!2sIsabelle%20DEBORDE%20Energ%C3%A9ticienne!5e0!3m2!1ses!2sca!4v1762114108448!5m2!1ses!2sca", 
    globalElfsightAppClass: "elfsight-app-489ab555-1bd3-44f8-9b63-7937ddb9f408",
};

export default parameters;