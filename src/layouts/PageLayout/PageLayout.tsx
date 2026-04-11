import Content from '@/layouts/Content';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import { Outlet } from 'react-router-dom';

export default function PageLayout() {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
}
