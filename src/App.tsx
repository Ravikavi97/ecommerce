import React, { useState } from 'react';
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/customer/HomePage';
import { ProductsPage } from './pages/customer/ProductsPage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { PaymentPage } from './pages/customer/PaymentPage';
import { AccountPage } from './pages/customer/AccountPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminProductsPage } from './pages/admin/ProductsPage';
import { AdminOrdersPage } from './pages/admin/OrdersPage';
import { AdminCustomersPage } from './pages/admin/CustomersPage';
import { AdminSettingsPage } from './pages/admin/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AboutPage } from './pages/customer/AboutPage';
import { ContactPage } from './pages/customer/ContactPage';
import { TrackOrderPage } from './pages/customer/TrackOrderPage';
import { FAQsPage } from './pages/customer/FAQsPage';
import { ShippingReturnsPage } from './pages/customer/ShippingReturnsPage';
import { PrivacyPolicyPage } from './pages/customer/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/customer/TermsConditionsPage';
import { AuthModal } from './components/modals/AuthModal';
import { CartDrawer } from './components/drawers/CartDrawer';
import { useApp } from './contexts/AppContext';
import { QueryProvider } from './contexts/QueryProvider';
import FeaturesPage from './pages/customer/FeaturesPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { state } = useApp();

  // Simple client-side routing mechanism
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Listen for popstate event (browser back/forward)
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine if we're in the admin area
  const isAdmin = currentPath.startsWith('/admin');

  // Route to the appropriate component
  const renderRoute = () => {
    // Admin routes
    if (isAdmin) {
      // For demo purposes, we'll skip proper auth here
      // In a real app, we would check if the user has admin privileges
      switch (currentPath) {
        case '/admin':
        case '/admin/dashboard':
          return <DashboardPage />;
        case '/admin/products':
          return <AdminProductsPage />;
        case '/admin/orders':
          return <AdminOrdersPage />;
        case '/admin/customers':
          return <AdminCustomersPage />;
        case '/admin/settings':
          return <AdminSettingsPage />;
        default:
          return <NotFoundPage />;
      }
    }

    // Customer routes
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/products':
        return <ProductsPage />;
      case '/product/1': // Hardcoded for demo
      case '/product/2':
      case '/product/3':
      case '/product/4':
      case '/product/5':
      case '/product/6':
        const productId = currentPath.split('/').pop();
        return <ProductDetailPage productId={productId || '1'} />;
      case '/cart':
        return <CartPage />;
      case '/checkout':
        return <CheckoutPage />;
      case '/payment':
        return <PaymentPage />;
      case '/account':
        return <AccountPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/track-order':
        return <TrackOrderPage />;
      case '/faqs':
        return <FAQsPage />;
      case '/shipping-returns':
        return <ShippingReturnsPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms-conditions':
        return <TermsConditionsPage />;
      case '/features':
        return <FeaturesPage/>
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <QueryProvider>
      {isAdmin ? (
        <AdminLayout navigateTo={navigateTo} currentPath={currentPath}>
          {renderRoute()}
        </AdminLayout>
      ) : (
        <CustomerLayout navigateTo={navigateTo} currentPath={currentPath}>
          {renderRoute()}
        </CustomerLayout>
      )}
      
      {/* Global components */}
      {state.isAuthModalOpen && <AuthModal />}
      {state.isCartDrawerOpen && <CartDrawer />}
    </QueryProvider>
  );
}

export default App;