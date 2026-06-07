import type { FooterNavLink } from '@/constants/navConfig';
import { getPath } from '@/router/routes';
export function getPathFromFooterNavLink(link: FooterNavLink): string {
  if ('href' in link) return link.href;

  const path = 'params' in link ? getPath(link.route, link.params) : getPath(link.route);

  return link.hash ? `${path}#${link.hash}` : path;
}
