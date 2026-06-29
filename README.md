# Thành Phát - Gạo Việt Thượng Hạng (E-Commerce Platform)

Một nền tảng thương mại điện tử chuyên cung cấp các loại gạo đặc sản Việt Nam chất lượng cao. Dự án được xây dựng với kiến trúc MERN Stack hiện đại, giao diện trực quan chuẩn UX/UI và đặc biệt tích hợp hệ thống thanh toán chuyển khoản tự động (Real-time).

## 🚀 Tính Năng Nổi Bật

### 🛒 Dành Cho Khách Hàng
*   **Giao diện hiện đại (UI/UX):** Thiết kế Responsive với TailwindCSS, mang lại trải nghiệm mượt mà trên cả Mobile và Desktop.
*   **Quản lý tài khoản:** Đăng ký, đăng nhập bảo mật bằng JWT.
*   **Trải nghiệm mua sắm:** Xem nhanh sản phẩm (Quick View), lọc sản phẩm nâng cao, đánh giá/nhận xét (Review).
*   **Giỏ hàng & Danh sách yêu thích:** Lưu trữ tự động, tính toán chi phí thông minh.
*   **Mã giảm giá (Coupon System):** Hỗ trợ đa dạng mã giảm giá (Phần trăm, Cố định, Freeship).
*   **Thanh toán hiện đại:**
    *   Thanh toán khi nhận hàng (COD).
    *   **Thanh toán tự động 100% qua SEpay:** Sinh mã VietQR động, xác nhận thanh toán theo thời gian thực (Real-time) qua Socket.IO mà không cần F5 trang.

### 🛡️ Dành Cho Quản Trị Viên (Admin)
*   **Dashboard Thống Kê:** Tổng quan doanh thu, đơn hàng, khách hàng mới.
*   **Quản lý Đơn hàng:** Theo dõi và cập nhật trạng thái đơn hàng (Đang xử lý, Đang giao, Thành công, Đã hủy).
*   **Quản lý Sản phẩm:** Thêm, sửa, xóa các loại gạo, quản lý tồn kho (Stock).

## 🛠️ Công Nghệ Sử Dụng

**Frontend:**
*   **Framework:** React 18 (Vite)
*   **Styling:** Tailwind CSS (kết hợp các biến CSS Custom Properties để quản lý Theme dễ dàng)
*   **Routing:** React Router DOM v6
*   **Real-time:** Socket.IO Client
*   **State Management:** React Context API

**Backend:**
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (sử dụng Mongoose ORM)
*   **Authentication:** JSON Web Tokens (JWT) & bcryptjs
*   **Real-time:** Socket.IO Server
*   **Payment Gateway:** SEpay (Webhook)

## 📦 Hướng Dẫn Cài Đặt

### 1. Yêu cầu hệ thống
*   Node.js (v16 trở lên)
*   MongoDB (Local hoặc MongoDB Atlas)

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/` và cấu hình các biến môi trường:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SEPAY_WEBHOOK_TOKEN=your_sepay_security_token
```

Khởi động Backend:
```bash
# Development mode
npm run dev
# Production mode
npm start
```

### 3. Cài đặt Frontend
```bash
cd front-end
npm install
```

Tạo file `.env` trong thư mục `front-end/` (nếu cần đổi URL kết nối backend):
```env
VITE_API_URL=http://localhost:5000/api
```

Khởi động Frontend:
```bash
npm run dev
```

## 💳 Luồng Thanh Toán Tự Động (SEpay Integration)
Dự án được tích hợp sâu với cổng thanh toán SEpay, mang lại luồng thanh toán không chạm:
1. Người dùng chọn thanh toán bằng "Chuyển khoản tự động".
2. Hệ thống sinh ra **mã VietQR** đi kèm số tiền chính xác và Nội dung chuyển khoản là Mã đơn hàng (VD: `ORD-123456`).
3. Khách hàng dùng App Ngân hàng quét và chuyển khoản.
4. Ngân hàng báo biến động số dư. SEpay đẩy **Webhook** về Backend.
5. Backend xác thực Webhook bằng `SEPAY_WEBHOOK_TOKEN`, cập nhật trạng thái đơn hàng thành `isPaid = true`.
6. Backend phát một sự kiện (Event) qua **Socket.IO** đến đúng người dùng đó.
7. Màn hình quét QR của khách hàng lập tức hiện dấu Tích xanh và chuyển hướng về kho đơn hàng (Không cần tải lại trang).
*(Lưu ý: Có tích hợp thêm cơ chế Polling API dự phòng trong trường hợp đường truyền Socket bị lỗi).*

## 👥 Tác Giả & Đóng Góp
*   Dự án được phát triển nhằm mục đích xây dựng nền tảng E-Commerce hiện đại, tối ưu hóa quy trình thanh toán tại Việt Nam.

---
⭐ Nếu bạn thấy dự án này hữu ích, hãy cho một sao (Star) trên GitHub nhé!!!
