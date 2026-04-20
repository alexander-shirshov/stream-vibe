import type {
  FooterSocialSection,
  FooterSection,
  FooterNavLink,
  FooterSocialLink,
} from '@/constants/navConfig';
import './Footer.scss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { getPathFromFooterNavLink } from '@/utils/links';
import { useLanguage } from '@/i18n/LanguageProvider';
import LinkButton from '@/components/Button';

type FooterProps = {
  navSections: FooterSection[];
  socialSection: FooterSocialSection;
  extraSection: FooterNavLink[];
};

export default function Footer({ navSections, socialSection, extraSection }: FooterProps) {
  const { t } = useLanguage();

  function renderNavLink(link: FooterNavLink, className: string) {
    const path = getPathFromFooterNavLink(link);
    return 'href' in link ? (
      <a href={link.href} className="footer__menu-title h6">
        {t(`footerLink.${link.labelKey}`)}
      </a>
    ) : (
      <NavLink
        to={path}
        end={path === '/'}
        className={({ isActive }) => clsx(className, isActive && 'is-active')}
      >
        {t(`footerLink.${link.labelKey}`)}
      </NavLink>
    );
  }

  function renderSocialLink(link: FooterSocialLink, className: string) {
    const Icon = link.icon;
    return (
      <LinkButton
        mode="link"
        link={{ href: link.href }}
        target="_blank"
        customClass={clsx(className, 'button--black-10', 'button')}
        ariaLabel={t(`socials.${link.labelKey}`)}
      >
        {<Icon className="icon button__icon" />}
      </LinkButton>
    );
  }

  function renderExtraLink(link: FooterNavLink, className: string, key: string) {
    if ('href' in link) {
      return (
        <a href={link.href} className={className} key={key}>
          {t(`footerLink.${link.labelKey}`)}
        </a>
      );
    }
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <nav className="footer__menu">
          {navSections.map(section => {
            return (
              <div className="footer__menu-column" key={section.main.labelKey}>
                {renderNavLink(section.main, 'footer__menu-title h6')}

                {section.links.length > 0 && (
                  <ul className="footer__menu-list">
                    {section.links.map(link => {
                      // const linkRoute = getPathFromFooterNavLink(link);
                      const linkLabel = link.labelKey;

                      return (
                        <li className="footer__menu-item" key={linkLabel}>
                          {renderNavLink(link, 'footer__menu-link')}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
          <div className="footer__menu-column">
            <p className="footer__menu-title h6">{t(`socials.${socialSection.titleKey}`)}</p>
            {socialSection.links.length > 0 && (
              <div className="footer__soc1als soc1als">
                <ul className="soc1als__list">
                  {socialSection.links.map(link => {
                    const linkLabel = link.labelKey;
                    return (
                      <li className="soc1als__item" key={linkLabel}>
                        {renderSocialLink(link, 'footer__menu-link')}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </nav>
        <div className="footer__extra">
          <p className="footer__copyright">
            @<time dateTime="2023">2023</time> streamvibe, All Rights Reserved
          </p>
          <div className="footer__extra-links">
            {extraSection.map(link => renderExtraLink(link, 'footer__extra-link', link.labelKey))}
          </div>
        </div>
      </div>
    </footer>
  );
}
