import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTopOrElement = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        setTimeout(() => {
            if (hash) {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 100); // Wait 100ms to ensure DOM is loaded

    }, [pathname, hash]);

    return null;
};