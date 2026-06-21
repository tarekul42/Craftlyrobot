/**
 * Navigation item type — used by header, footer, and mobile nav.
 */

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavItemWithChildren extends NavItem {
  children?: NavItem[];
}
