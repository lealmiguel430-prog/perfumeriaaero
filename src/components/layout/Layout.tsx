import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import CartDrawer from '../shop/CartDrawer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-gray-100 font-sans">
      <ScrollToTop />
      <Header />
      {/* 
        flex-grow ensures the main content takes up remaining space.
        w-full ensures it doesn't collapse horizontally.
        relative allows for absolute positioning inside if needed.
      */}
      <main className="flex-grow w-full relative">
        <Outlet />
      </main>
      <WhatsAppButton />
      <CartDrawer />
      <Footer />
    </div>
  );
};

export default Layout;
