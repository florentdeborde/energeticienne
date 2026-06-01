const parameters = {
    // general
    globalLogo: '/images/site/logo/LOGO-VECTORIEL2.svg',
    globalVisibleDesktopMenus: 5,
    globalCenteredLimitMobileMenus: 6,

    // env. secrets
    globalWebsiteActive: import.meta.env.VITE_WEBSITE_ACTIVE === 'true',
    globalDefaultLang: import.meta.env.VITE_DEFAULT_LANG || 'fr',

    // google
    globalIframeSrc: {
        fr: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.189273153357!2d-0.36406794520932945!3d48.58707469751342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48098d0098ea4521%3A0xdf6505f75b2c4d16!2sIsabelle%20DEBORDE%20Energ%C3%A9ticienne!5e0!3m2!1sfr!2sfr!4v1780329427473!5m2!1sfr!2sfr",
        en: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.189269306359!2d-0.3617826877653335!3d48.5870747711769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48098d0098ea4521%3A0xdf6505f75b2c4d16!2sIsabelle%20DEBORDE%20Energ%C3%A9ticienne!5e0!3m2!1sen!2sfr!4v1780329580012!5m2!1sen!2sfr"
    },

    globalElfsightAppClass: "elfsight-app-489ab555-1bd3-44f8-9b63-7937ddb9f408",
};

export default parameters;