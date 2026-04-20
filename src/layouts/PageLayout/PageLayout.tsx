import Content from '@/layouts/Content';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import { Outlet } from 'react-router-dom';

import { footerNavSections, footerExtraSection, footerSocialSection } from '@/config/footerNav';

export default function PageLayout() {
  return (
    <div className="page-layout">
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer
        navSections={footerNavSections}
        socialSection={footerSocialSection}
        extraSection={footerExtraSection}
      />
    </div>
  );
}
