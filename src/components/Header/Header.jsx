import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleLogoNavigation } from '../../utils/navigationUtils';
import './Header.css';

const Header = ({ menu, overflowMenu, flattenMenu, t, logoId = "home", logoSrc, centeredLimitMobileMenus = 6 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTarget, setActiveTarget] = useState('');

  const logoItem = menu.find(item => item.id === logoId) || { path: "/" };
  
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 650) {
        setIsScrolling(false);
      } else {
        setIsScrolling(window.scrollY > 5);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isMobile) setIsMenuOpen(!isMenuOpen);
  };

  // Desktop link handler
  const handleDesktopClick = (e, item) => {
    setActiveTarget(item.id);

    if (item.target && location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, "", `#${item.id}`);
      }
    }
  };

  return (
    <header className={`header ${isScrolling && !isMobile ? 'scrolled' : ''}`}>
      <div className="logo-container" onClick={(e) => handleLogoNavigation(e, location.pathname, navigate, logoItem.path)}>
        <img src={logoSrc} alt="Logo" className={`logo ${isScrolling && !isMobile ? 'scrolled' : ''}`} />
      </div>

      <div className="nav-container">
        {/* Desktop menu */}
        {!isMobile && (
          <DesktopHeader
            menu={menu}
            overflowMenu={overflowMenu}
            activeTarget={activeTarget}
            handleDesktopClick={handleDesktopClick}
            t={t}
          />
        )}


        {/* Mobile menu */}
        {isMobile && (
          <>
            <nav className={`nav ${isMenuOpen ? 'open' : ''} ${flattenMenu.length < centeredLimitMobileMenus ? 'centered' : ''}`} ref={menuRef} onClick={() => setIsMenuOpen(false)}>
              {flattenMenu.map((item, index) => (
                <div key={index} className="nav-item">
                  <Link
                    className="nav-link"
                    to={item.path}
                  >
                    {t(`menu.${item.id}`)}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="menu-toggle" onClick={toggleMenu} ref={menuButtonRef}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

const DesktopHeader = ({ menu, overflowMenu, activeTarget, handleDesktopClick, t }) => {
  /**
   * Recursive helper to render dropdown items (targets + nested submenus)
   * Only processes items that are meant to appear "under parent"
   */
  const renderSubItems = (items, parentPath) => {
    return items.flatMap((item) => {
      const elements = [];

      // Render visible items meant to appear under parent
      if (item.showInHeader && item.showUnderParent) {
        elements.push(
          <li key={item.id}>
            <Link
              className="submenu-link"
              to={item.target ? `${parentPath}#${item.id}` : item.path}
              onClick={(e) => handleDesktopClick(e, item)}
            >
              {t(`menu.${item.id}`)}
            </Link>
          </li>
        );
      }

      // Recurse into submenus that have visible children under parent
      if (item.subMenu?.length) {
        elements.push(...renderSubItems(item.subMenu, item.path || parentPath));
      }

      return elements;
    });
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <nav className="nav">
      {menu.map((parent, index) => {
        const parentVisible = parent.showInHeader;
        const hasSub = parent.subMenu?.length > 0;

        // -------------------------------
        // CASE 1: Parent visible in header
        // -------------------------------
        if (parentVisible) {
          const dropdownChildren =
            parent.subMenu?.filter(
              (child) => child.showInHeader && child.showUnderParent
            ) || [];

          // Children that should be visible directly in header
          // (even if they are nested inside a subMenu)
          const flatChildren = [];
          const collectFlatChildren = (items, basePath) => {
            items.forEach((child) => {
              if (child.showInHeader && !child.showUnderParent) {
                flatChildren.push({
                  ...child,
                  path: child.target
                    ? `${basePath}#${child.id}`
                    : child.path || basePath,
                });
              }
              if (child.subMenu?.length) {
                collectFlatChildren(child.subMenu, child.path || basePath);
              }
            });
          };
          if (parent.subMenu?.length)
            collectFlatChildren(parent.subMenu, parent.path);

          return (
            <div
              key={index}
              className="header-parent-container"
              style={{ display: "flex", gap: "25px" }}
            >
              {/* Clickable parent */}
              <div
                className={`nav-item ${
                  activeTarget === parent.id ? "active" : ""
                } ${dropdownChildren.length ? "has-submenu" : ""}`}
              >
                <Link
                  className="nav-link"
                  to={parent.path || "/"}
                  onClick={(e) => handleDesktopClick(e, parent)}
                >
                  {t(`menu.${parent.id}`)}
                </Link>

                {/* Dropdown for visible children under parent */}
                {dropdownChildren.length > 0 && (
                  <div className="submenu-container">
                    <ul>{renderSubItems(dropdownChildren, parent.path)}</ul>
                  </div>
                )}
              </div>

              {/* Flattened children (visible but not under parent) */}
              {flatChildren.map((child, cIndex) => (
                <div
                  key={`${index}-flat-${cIndex}`}
                  className={`nav-item ${
                    activeTarget === child.id ? "active" : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    to={child.path}
                    onClick={(e) => handleDesktopClick(e, child)}
                  >
                    {t(`menu.${child.id}`)}
                  </Link>
                </div>
              ))}
            </div>
          );
        }

        // -------------------------------
        // CASE 2: Parent not visible in header
        // -------------------------------
        if (!parentVisible && hasSub) {
          const dropdownChildren = parent.subMenu.filter(
            (child) => child.showInHeader && child.showUnderParent
          );
          const flatChildren = [];
          const collectFlatChildren = (items, basePath) => {
            items.forEach((child) => {
              if (child.showInHeader && !child.showUnderParent) {
                flatChildren.push({
                  ...child,
                  path: child.target
                    ? `${basePath}#${child.id}`
                    : child.path || basePath,
                });
              }
              if (child.subMenu?.length) {
                collectFlatChildren(child.subMenu, child.path || basePath);
              }
            });
          };
          collectFlatChildren(parent.subMenu, parent.path);

          return (
            <div
              key={index}
              className="header-parent-fake-container"
              style={{ display: "flex", gap: "25px" }}
            >
              {/* Fake (non-clickable) parent for dropdown */}
              {dropdownChildren.length > 0 && (
                <div className="nav-item has-submenu">
                  <div className="nav-link fake-parent">
                    {t(`menu.${parent.id}`)}
                  </div>
                  <div className="submenu-container">
                    <ul>{renderSubItems(dropdownChildren, parent.path)}</ul>
                  </div>
                </div>
              )}

              {/* Flatten visible children directly in header */}
              {flatChildren.map((child, cIndex) => (
                <div
                  key={`${index}-flat-${cIndex}`}
                  className={`nav-item ${
                    activeTarget === child.id ? "active" : ""
                  }`}
                >
                  <Link
                    className="nav-link"
                    to={child.path}
                    onClick={(e) => handleDesktopClick(e, child)}
                  >
                    {t(`menu.${child.id}`)}
                  </Link>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}

      {overflowMenu.length > 0 && (
        <div className="nav-item has-submenu more-menu">
          <button className="nav-link more-button" onClick={() => setShowMore(!showMore)}>
            <MoreHorizIcon />
          </button>

          {showMore && (
            <div className="submenu-container">
              <ul>
                {overflowMenu.map((item) => (
                  <li key={item.id}>
                    <Link className="submenu-link" to={item.path || "/"} onClick={(e) => handleDesktopClick(e, item)}>
                      {t(`menu.${item.id}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

