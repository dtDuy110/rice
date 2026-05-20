import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import AdminLayout from './components/layout/AdminLayout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/admin/DashboardPage'
import OrdersPage from './pages/admin/OrdersPage'
import ProductManagementPage from './pages/admin/ProductManagementPage'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
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

        {/* Main public layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="san-pham" element={<ProductsPage />} />
          <Route path="san-pham/:id" element={<ProductDetailPage />} />
          <Route path="gio-hang" element={<CartPage />} />
        </Route>
      </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
