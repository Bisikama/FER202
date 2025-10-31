# 🚀 Hướng dẫn Setup Lab 6 - Từng Bước Chi Tiết

## ✅ Checklist Hoàn Thành

### Bước 1: Cài Đặt Packages (5 phút)

```bash
npm install axios @reduxjs/toolkit react-redux formik yup @react-oauth/google jwt-decode
```

Hoặc nếu có lỗi, cài từng package:
```bash
npm install axios
npm install @reduxjs/toolkit react-redux
npm install formik yup
npm install @react-oauth/google jwt-decode
```

**Kiểm tra:** Mở `package.json`, bạn sẽ thấy các packages trên trong `dependencies`.

---

### Bước 2: Setup MockAPI (10 phút)

1. **Truy cập:** https://mockapi.io/
2. **Đăng nhập/Đăng ký** (có thể dùng Google)
3. **Tạo Project mới:**
   - Click "+ New Project"
   - Đặt tên: "orchids-gallery" (hoặc tên bạn thích)
4. **Tạo Endpoint:**
   - Click "+ New Resource"
   - Resource name: `orchids`
   - Click "Create"
5. **Thêm Fields** cho orchids:
   ```
   id: ID (auto-generated)
   name: String
   category: String
   origin: String
   color: String
   rating: Number
   image: String (URL)
   isSpecial: Boolean
   isNatural: Boolean
   numberOfLike: Number
   ```
6. **Generate Data:**
   - Click "Generate" để tạo data mẫu
   - Hoặc click "Add Item" để thêm manual

7. **Copy API URL:**
   - Bạn sẽ thấy URL dạng: `https://6704347d0a340b270a44.mockapi.io/orchids`
   - Copy URL này (không bao gồm `/orchids` ở cuối)

**Kiểm tra:** Truy cập `https://YOUR_ID.mockapi.io/orchids` trong browser, bạn sẽ thấy JSON data.

---

### Bước 3: Setup Google OAuth (15 phút)

1. **Truy cập:** https://console.cloud.google.com/
2. **Tạo/Chọn Project:**
   - Click "Select a project" → "New Project"
   - Project name: "Orchid Gallery"
   - Click "Create"
3. **Enable API:**
   - Vào "APIs & Services" → "Library"
   - Tìm "Google+ API" hoặc "Google Identity"
   - Click "Enable"
4. **Tạo OAuth Credentials:**
   - Vào "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: "Orchid Gallery Web Client"
5. **Authorized JavaScript origins:**
   ```
   http://localhost:5173
   http://localhost:3000
   ```
6. **Authorized redirect URIs:**
   ```
   http://localhost:5173
   http://localhost:3000
   ```
7. **Click "Create"**
8. **Copy Client ID:**
   - Bạn sẽ nhận được Client ID dạng: `123456789-abcdef.apps.googleusercontent.com`
   - Copy toàn bộ string này

**Kiểm tra:** Client ID phải có đuôi `.apps.googleusercontent.com`

---

### Bước 4: Cập Nhật File .env (2 phút)

Tạo/Sửa file `.env` ở thư mục root của project:

```env
# MockAPI URL (từ Bước 2)
VITE_API_BASE_URL=https://6704347d0a340b270a44.mockapi.io/orchids

# Google Client ID (từ Bước 3)
VITE_GOOGLE_CLIENT_ID=123456789-abcdef.apps.googleusercontent.com
```

**⚠️ LƯU Ý:**
- Thay `6704347d0a340b270a44` bằng ID project MockAPI của bạn
- Thay `123456789-abcdef` bằng Client ID thực của bạn
- Không có dấu cách thừa
- Không có dấu ngoặc kép

**Kiểm tra:** File `.env` phải nằm cùng cấp với `package.json`

---

### Bước 5: Thêm Data Mẫu vào MockAPI (5 phút)

Vào MockAPI, click vào resource `orchids`, thêm data mẫu:

```json
{
  "name": "Phalaenopsis Orchid",
  "category": "Phalaenopsis",
  "origin": "Vietnam",
  "color": "Pink",
  "rating": 4.5,
  "image": "https://images.unsplash.com/photo-1615715616181-6b0ff1c44ecd?w=500",
  "isSpecial": true,
  "isNatural": true,
  "numberOfLike": 120
}
```

Thêm ít nhất 3-5 orchids để test.

**Kiểm tra:** GET request `https://YOUR_ID.mockapi.io/orchids` trả về array có data.

---

### Bước 6: Chạy Ứng Dụng (2 phút)

```bash
npm run dev
```

**Mở browser:** http://localhost:5173

---

## 🎯 Test Các Tính Năng

### ✅ Test 1: Fetch Data từ MockAPI
1. Mở trang Home
2. Bạn sẽ thấy loading spinner
3. Sau đó hiển thị danh sách orchids từ MockAPI
4. **Nếu lỗi:** Kiểm tra Console (F12) để xem error message

### ✅ Test 2: Login với Google
1. Click nút "🔐 Login with Google" ở navbar
2. Popup Google Login hiển thị
3. Chọn tài khoản Google
4. Sau khi login thành công:
   - Thấy avatar và tên user ở navbar
   - Thấy nút "Logout"
   - Có nút "➕ Add New Orchid"

### ✅ Test 3: View Detail
1. Click nút "👁️ Detail" ở bất kỳ orchid nào
2. Chuyển đến trang detail
3. Hiển thị đầy đủ thông tin orchid
4. **Nếu lỗi 404:** Kiểm tra ID trong URL có đúng không

### ✅ Test 4: Create Orchid (Cần Login)
1. Login trước
2. Click "➕ Add New Orchid"
3. Form hiển thị
4. Điền thông tin:
   - Name: "Test Orchid"
   - Category: Chọn từ dropdown
   - Origin: "Test"
   - Color: "White"
   - Rating: 5
   - Image URL: `https://via.placeholder.com/400`
5. Click "Create Orchid"
6. Alert thành công
7. Orchid mới xuất hiện trong danh sách

### ✅ Test 5: Edit Orchid (Cần Login)
1. Click "✏️ Edit" ở orchid bất kỳ
2. Form hiển thị với data sẵn
3. Sửa thông tin (vd: đổi rating)
4. Click "Update Orchid"
5. Alert thành công
6. Data được cập nhật

### ✅ Test 6: Delete Orchid (Cần Login)
1. Click "🗑️ Delete" ở orchid bất kỳ
2. Confirm dialog hiển thị
3. Click "OK"
4. Alert thành công
5. Orchid biến mất khỏi danh sách

### ✅ Test 7: Filter
1. Chọn "Natural" từ dropdown filter
2. Chỉ hiển thị orchids có `isNatural: true`
3. Chọn "Special"
4. Chỉ hiển thị orchids có `isSpecial: true`
5. Chọn "All"
6. Hiển thị tất cả

---

## 🐛 Troubleshooting - Khắc Phục Lỗi

### ❌ Lỗi: "Cannot find module '@reduxjs/toolkit'"
**Giải pháp:**
```bash
npm install @reduxjs/toolkit react-redux
```

### ❌ Lỗi: "Cannot find module 'formik'"
**Giải pháp:**
```bash
npm install formik yup
```

### ❌ Lỗi: Network Error / CORS
**Nguyên nhân:** MockAPI URL sai hoặc project không tồn tại
**Giải pháp:**
1. Kiểm tra URL trong `.env`
2. Test URL trực tiếp trong browser
3. Đảm bảo MockAPI project đang active

### ❌ Lỗi: "Failed to fetch orchids"
**Giải pháp:**
1. Mở DevTools (F12) → Console tab
2. Xem error message chi tiết
3. Kiểm tra `VITE_API_BASE_URL` trong `.env`
4. Restart dev server: `Ctrl+C` → `npm run dev`

### ❌ Lỗi: Google Login không hoạt động
**Giải pháp:**
1. Kiểm tra `VITE_GOOGLE_CLIENT_ID` trong `.env`
2. Kiểm tra Authorized Origins trong Google Console
3. Phải dùng `http://localhost:5173` (không phải IP)
4. Clear browser cache và cookie

### ❌ Lỗi: "401 Unauthorized" khi CRUD
**Giải pháp:**
- MockAPI không yêu cầu auth, bỏ qua lỗi này
- Hoặc remove Authorization header trong `api.js`

### ❌ Lỗi: Data không cập nhật sau khi Create/Edit/Delete
**Giải pháp:**
```javascript
// Sau mỗi action, dispatch lại fetchOrchids
dispatch(fetchOrchids());
```

### ❌ Lỗi: Image không hiển thị
**Giải pháp:**
1. Dùng URL images từ internet (Unsplash, Placeholder)
2. Ví dụ: `https://via.placeholder.com/400x300`
3. Hoặc: `https://images.unsplash.com/photo-1615715616181-6b0ff1c44ecd?w=400`

---

## 📱 Test Responsive Design

1. **Desktop:** ≥ 992px - Hiển thị 4 cards/row
2. **Tablet:** 768-991px - Hiển thị 2-3 cards/row
3. **Mobile:** < 768px - Hiển thị 1-2 cards/row

**Test:** F12 → Toggle Device Toolbar → Chọn các device

---

## 🎓 Kiến Thức Cần Biết

### Redux Flow:
```
Component → dispatch(action) → Reducer → Update State → Re-render Component
```

### Async Flow với Redux Toolkit:
```
dispatch(fetchOrchids) → API Call → Success/Failure → Update State
```

### Form Validation với Formik:
```
Initial Values → User Input → Validation → Submit → API Call
```

---

## 📚 Tài Liệu Tham Khảo

- Redux Toolkit: https://redux-toolkit.js.org/
- Formik: https://formik.org/
- Yup: https://github.com/jquense/yup
- Google OAuth: https://developers.google.com/identity/oauth2/web/guides/overview
- MockAPI: https://mockapi.io/docs

---

## ✨ Bonus Features (Nếu có thời gian)

1. **Search by Name:** Thêm search bar
2. **Pagination:** Thêm phân trang
3. **Like Feature:** Toggle like/unlike
4. **Image Upload:** Upload image thay vì URL
5. **Dark Mode:** Toggle theme cho toàn app

---

## 📝 Checklist Nộp Bài

- [ ] Đã cài đặt tất cả packages
- [ ] MockAPI có ít nhất 5 orchids
- [ ] Google Login hoạt động
- [ ] CRUD operations hoạt động (Create, Read, Update, Delete)
- [ ] Filter hoạt động
- [ ] Form validation hoạt động
- [ ] Responsive design
- [ ] Không có lỗi trong Console
- [ ] Code clean và có comment

---

**Chúc bạn làm bài tốt! 🌸**
