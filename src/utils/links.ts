import type { FooterNavLink } from '@/constants/navConfig';
import { getPath } from '@/router/routes';
export function getPathFromFooterNavLink(link: FooterNavLink): string {
  return 'href' in link
    ? link.href
    : 'params' in link
      ? getPath(link.route, link.params)
      : getPath(link.route);
}
