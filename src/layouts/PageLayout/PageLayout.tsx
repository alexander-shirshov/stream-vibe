import Content from '@/layouts/Content';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import Banner from '@/components/Banner';
import { Outlet, useLocation } from 'react-router-dom';

import { footerNavSections, footerExtraSection, footerSocialSection } from '@/config/footerNav';

export default function PageLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="page-layout">
      <Header />
      <Content needResetPaddingTop={isHome}>
        <Outlet />
      </Content>
      <Banner />
      <Footer
        navSections={footerNavSections}
        socialSection={footerSocialSection}
        extraSection={footerExtraSection}
      />
    </div>
  );
}
