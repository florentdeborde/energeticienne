// menu.js
// Defines the main navigation structure.
//
// Each item can be:
// - a page (path)
// - a scroll target within a page (target=true)
// - a container of sub-pages (subMenu)
//
// Properties:
// - id: unique key (used for i18n and scroll targets)
// - path: URL path (ignored if target=true)
// - target: marks a scroll section within a parent page
// - showInHeader / showInFooter: visibility flags
// - showUnderParent: if true → appears in parent dropdown; if false → flattened
// - logo: marks the logo link
// - subMenu: nested items
//
// Rules:
// 1. Targets resolve as `ancestorPath#targetId`.
// 2. `showUnderParent=false` → item appears at top level.
// 3. `showUnderParent=true` → item appears in a dropdown. If parent is hidden, it becomes a fake (non-clickable) parent.
// 4. Pages with subMenu act as “target containers”: children paths inherit their parent path.

const menu = [
  {
    id: "home",
    path: "/",
    logo: true,
    showInHeader: false,
    showInFooter: false,
    subMenu: [
      { id: "domaines-de-soins", target: true, showInHeader: true, showUnderParent: false, showInFooter: true },
      { id: "qui-suis-je", target: true, showInHeader: true, showUnderParent: false, showInFooter: true },
      { id: "seance", target: true, showInHeader: true, showUnderParent: false, showInFooter: true },
      { id: "votre-seance", target: true, showInHeader: true, showUnderParent: false, showInFooter: true },
      { id: "avis", target: true, showInHeader: true, showUnderParent: false, showInFooter: true }
    ]
  },
  {
    id: "mentions-legales",
    path: "/mentions-legales",
    showInHeader: false,
    showInFooter: false,
    subMenu: []
  },
/* 
  {
    id: "services",
    path: "/services",
    showInHeader: true,
    showInFooter: true,
    subMenu: [
      { id: "service1", path: "/services/service1", showInHeader: true, showUnderParent: true, showInFooter: true },
      { id: "service2", path: "/services/service2", showInHeader: true, showUnderParent: true, showInFooter: true }
    ]
  },
  {
    id: "about",
    path: "/about",
    showInHeader: true,
    showInFooter: true,
    subMenu: [
      {
        id: "team",
        path: "/about/team",
        showInHeader: true,
        showUnderParent: true,
        showInFooter: true,
        subMenu: [
          { id: "team1", target: true, showInHeader: true, showUnderParent: true, showInFooter: true },
          { id: "team2", target: true, showInHeader: true, showUnderParent: true, showInFooter: true }
        ]
      },
      { id: "history", path: "/about/history", showInHeader: true, showUnderParent: true, showInFooter: true }
    ]
  }
*/
];

export default menu;

/**
 * Flattens menu items for header/footer rendering.
 *
 * Rules:
 * - Targets → `ancestorPath#targetId`
 * - Flattened items → top level
 * - Dropdown items → under parent or fake parent
 *
 * @param {Array} menuItems
 * @returns {Object} { headerFlattenMenu, footerFlattenMenu }
 */
export function prepareFlattenMenu(menuItems) {
  const flattenMenu = (items, type, containerPath = "/") => {
    const result = [];

    items.forEach(item => {
      const visible = !!item[type];
      const isTarget = !!item.target;

      const nextContainerPath =
        !isTarget && item.path ? item.path : containerPath;

      const exposedPath = isTarget
        ? `${nextContainerPath}#${item.id}`
        : item.path || containerPath;

      if (visible) {
        result.push({ id: item.id, path: exposedPath, target: isTarget });
      }

      if (item.subMenu?.length) {
        result.push(...flattenMenu(item.subMenu, type, nextContainerPath));
      }
    });

    return result;
  };

  return {
    headerFlattenMenu: flattenMenu(menuItems, "showInHeader"),
    footerFlattenMenu: flattenMenu(menuItems, "showInFooter")
  };
}

/**
 * Prepares the desktop navigation menu with an overflow section.
 *
 * The function selects which top-level items remain visible up to the given limit.
 * Any additional items are moved into an overflow list (e.g., the “...” dropdown).
 *
 * Rules:
 * - Items with `showInHeader=false` are ignored.
 * - Children with `showUnderParent=false` are promoted to top-level and count toward the limit.
 * - If a parent ends up in the overflow, all its `showUnderParent=true` children
 *   are also moved to the overflow.
 *
 * @param {Array} menuItems - The full menu definition.
 * @param {number} limit - Maximum number of visible top-level items (default: 3).
 * @returns {Object} { mainMenu, overflowMenu }
 */
export function prepareMenuWithOverflow(menuItems, limit = 3) {

  const topLevelVisibleItems = [];

  // 1. Collect all items that should appear as top-level in the header
  menuItems.forEach(item => {
    if (item.showInHeader) {
      topLevelVisibleItems.push(item);
    }

    // Children with showUnderParent=false are promoted to top-level
    if (item.subMenu?.length) {
      item.subMenu.forEach(child => {
        if (child.showInHeader && child.showUnderParent === false) {
          topLevelVisibleItems.push({
            ...child,
            parent: item,
            isPromoted: true
          });
        }
      });
    }
  });

  // 2. Preserve the natural menu order:
  //    Promoted children appear right after their parent.
  const orderedList = topLevelVisibleItems.sort((a, b) => {
    const posA = a.isPromoted ? menuItems.indexOf(a.parent) + 0.1 : menuItems.indexOf(a);
    const posB = b.isPromoted ? menuItems.indexOf(b.parent) + 0.1 : menuItems.indexOf(b);
    return posA - posB;
  });

  // 3. Split items based on the limit
  const baseOverflow = orderedList.slice(limit);

  // 4. Expand overflow logic:
  //    If a parent is in the overflow, all its showUnderParent children follow it.
  const overflowIds = new Set(baseOverflow.map(i => i.id));
  const mainMenu = [];
  const overflowMenu = [...baseOverflow];

  orderedList.forEach(item => {
    if (overflowIds.has(item.id)) {
      // Parent is in overflow → push dropdown children too
      if (item.subMenu?.length) {
        item.subMenu.forEach(child => {
          if (child.showInHeader && child.showUnderParent === true) {
            overflowMenu.push(child);
          }
        });
      }
    } else {
      mainMenu.push(item);
    }
  });

  return { mainMenu, overflowMenu };
}
