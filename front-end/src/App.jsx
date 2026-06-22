import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/admin/DashboardPage'
import OrdersPage from './pages/admin/OrdersPage'
import ProductManagementPage from './pages/admin/ProductManagementPage'
import NotFoundPage from './pages/NotFoundPage'
import WishlistPage from './pages/WishlistPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import FAQPage from './pages/FAQPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import PolicyPage from './pages/PolicyPage'
import OrderPaymentPage from './pages/OrderPaymentPage'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import { NotificationProvider } from './context/NotificationContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <NotificationProvider>
          <WishlistProvider>
            <CartProvider>
              <Router>
        <Routes>
          {/* Auth - no layout */}
          <Route path="/dang-nhap" element={<SignInPage />} />
          <Route path="/dang-ky" element={<SignUpPage />} />

          {/* Admin layout */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="don-hang" element={<OrdersPage />} />
            <Route path="san-pham" element={<ProductManagementPage />} />
          </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="san-pham" element={<ProductsPage />} />
              <Route path="san-pham/:id" element={<ProductDetailPage />} />
              <Route path="gioi-thieu" element={<AboutPage />} />
              <Route path="lien-he" element={<ContactPage />} />
              <Route path="gio-hang" element={<CartPage />} />
              <Route path="yeu-thich" element={<WishlistPage />} />
              <Route path="tin-tuc" element={<BlogPage />} />
              <Route path="tin-tuc/:slug" element={<BlogDetailPage />} />
              <Route path="cau-hoi-thuong-gap" element={<FAQPage />} />
              <Route path="theo-doi-don-hang" element={<OrderTrackingPage />} />
              <Route path="chinh-sach" element={<PolicyPage />} />
              <Route path="thanh-toan" element={
                <ProtectedRoute>
                  <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="thanh-toan-sepay/:id" element={
              <ProtectedRoute>
                <OrderPaymentPage />
              </ProtectedRoute>
            } />
            <Route path="tai-khoan" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
              </Router>
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
