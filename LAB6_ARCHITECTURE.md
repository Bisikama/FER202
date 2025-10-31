# Lab 6 — Architecture & Key Files

Tập tài liệu này mô tả nhanh các file chính bạn vừa tích hợp cho Lab 6: `api.js`, `store.js` và các slice trong `store/slices` (đặc biệt `orchidSlice.js` và `authSlice.js`). Mục tiêu: giúp bạn hiểu flow, biết gọi hàm, và debug nhanh.

---

## Mục lục

- Tổng quan
- Environment variables
- `src/services/api.js`
  - Mục đích
  - Axios instance & interceptors
  - Các hàm API (getAllOrchids, getOrchidById, ...)
  - Ví dụ sử dụng
- `src/store/store.js`
  - Cấu hình store
  - Middleware
- `src/store/slices/orchidSlice.js`
  - State shape
  - Async thunks
  - Reducers & actions
  - Usage (component example)
- `src/store/slices/authSlice.js`
  - State shape
  - Actions (loginSuccess, logout, ...)
  - Usage
- Tích hợp trong component (Orchids / OrchidDetail)
- Lệnh chạy & debug nhanh

---

## Tổng quan

Project dùng MockAPI làm backend (REST). Frontend dùng:
- Axios cho HTTP (wrapper ở `src/services/api.js`).
- Redux Toolkit (slices + async thunks) để quản lý state và gọi API.
- Formik + Yup cho form validation (đã setup trong `components/Forms/OrchidForm.jsx`).
- Google OAuth (`@react-oauth/google`) để login (token lưu localStorage).
- SCSS cho styling.

---

## Environment variables

File: `.env` (root project)

- `VITE_API_BASE_URL` — base URL của MockAPI (ví dụ: `https://69043472d0f10a340b270a44.mockapi.io` hoặc `https://...mockapi.io`)
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client id

Lưu ý: `import.meta.env.VITE_API_BASE_URL` được dùng trong `api.js`.

---

## src/services/api.js

Mục đích: tạo 1 axios instance có baseURL, header chuẩn và interceptor để (nếu có) thêm token Authorization. Đồng thời cung cấp hàm CRUD cho resource `orchids`.

Key points:
- `BASE_URL` = `import.meta.env.VITE_API_BASE_URL` (fallback có thể được set trong file nếu cần).
- Axios instance `api = axios.create({ baseURL: BASE_URL, headers: { 'Content-Type': 'application/json' } })`.
- `api.interceptors.request` đọc token từ `localStorage` (key `'authToken'`) và thêm header `Authorization: Bearer <token>`.
- `api.interceptors.response` bắt lỗi 401 để clear token / redirect nếu muốn.

Các hàm export chính:
- `getAllOrchids()` — GET `/orchids` (trả về array)
- `getOrchidById(id)` — GET `/orchids/:id` (trả về object)
- `createOrchid(orchidData)` — POST `/orchids`
- `updateOrchid(id, orchidData)` — PUT `/orchids/:id`
- `deleteOrchid(id)` — DELETE `/orchids/:id`
- `searchOrchids(searchTerm)` — GET `/orchids?search=...`
- `filterOrchidsByCategory(category)` — GET `/orchids?category=...`
- `fetchOrchidsWithFetch()` — alternative using native fetch

Ví dụ sử dụng (thẳng trong component nếu không dùng Redux):

```js
import { getAllOrchids } from '../services/api';

useEffect(() => {
  async function load() {
    try {
      const list = await getAllOrchids();
      setOrchids(list);
    } catch (e) { console.error(e); }
  }
  load();
}, []);
```

Lưu ý: đảm bảo `VITE_API_BASE_URL` không chồng phần resource — nếu `VITE_API_BASE_URL` đã chứa `/orchids`, thì các hàm `api.get('/orchids')` sẽ tạo đường dẫn với `/orchids/orchids` (duplicate). Giải pháp: đặt `VITE_API_BASE_URL` chỉ là root của project MockAPI (ví dụ `https://xxxxx.mockapi.io`) và giữ các hàm gọi `'/orchids'`.

---

## src/store/store.js

Mục đích: cấu hình Redux store với Redux Toolkit.

Key points:
- `configureStore({ reducer: { orchids: orchidReducer, auth: authReducer }, middleware: getDefaultMiddleware({ serializableCheck: false }) })`.
- `serializableCheck: false` được bật để tránh cảnh báo khi lưu các giá trị không serializable (ví dụ token dạng object) — chỉ dùng khi cần.

Store export: `export const store = configureStore(...)`.

Sử dụng: bọc `App` bằng `<Provider store={store}>` trong `main.jsx`.

---

## src/store/slices/orchidSlice.js

Mục đích: quản lý state liên quan orchid — list, selected, filters, loading, error.

State shape (initialState):
```js
{
  orchids: [],
  selectedOrchid: null,
  filteredOrchids: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterCategory: 'All',
}
```

Async thunks (sử dụng `createAsyncThunk`):
- `fetchOrchids` — gọi `getAllOrchids()` và lưu kết quả vào `orchids` và `filteredOrchids`.
- `fetchOrchidById` — gọi `getOrchidById(id)` và lưu vào `selectedOrchid`.
- `addOrchid` — gọi `createOrchid(orchidData)` và push vào list khi thành công.
- `editOrchid` — gọi `updateOrchid(id, orchidData)` và cập nhật item trong list.
- `removeOrchid` — gọi `deleteOrchid(id)` và loại bỏ item khỏi list.

Reducers/Actions:
- `setSearchTerm(payload)` — cập nhật `searchTerm` và lọc `filteredOrchids` dựa trên tên/field.
- `setFilterCategory(payload)` — cập nhật `filterCategory` (All / Natural / Special) và lọc `filteredOrchids`.
- `clearSelectedOrchid()` — clear `selectedOrchid` khi unmount detail.

Extra reducers: xử lý pending/fulfilled/rejected cho từng async thunk (set loading, set error, update state khi fulfilled).

Usage in component (example `Orchids.jsx`):
```js
const dispatch = useDispatch();
const { filteredOrchids, loading, error } = useSelector(state => state.orchids);

useEffect(() => { dispatch(fetchOrchids()); }, [dispatch]);

// on delete
await dispatch(removeOrchid(id)).unwrap();
// after that you can dispatch(fetchOrchids()) or rely on slice to update state
```

Notes:
- `.unwrap()` (returned by thunk) giúp catch lỗi từ thunk trong try/catch.
- Khi tạo / sửa / xóa thành công cần đảm bảo state được cập nhật (slice đã push/update/remove trong fulfilled handlers).

---

## src/store/slices/authSlice.js

Mục đích: quản lý authentication state (Google login). Không dùng server-side auth; token Google được lưu localStorage và dùng để đánh dấu authenticated user.

State shape:
```js
{
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
}
```

Reducers / Actions:
- `loginStart()` — set loading true
- `loginSuccess(payload)` — set `isAuthenticated = true`, `user` and `token`, lưu token/user vào `localStorage`
- `loginFailure(payload)` — set error
- `logout()` — clear user/token, remove localStorage
- `loadUserFromStorage()` — đọc token/user từ localStorage khi app mount

Usage example (in `Login.jsx`):
- Khi Google login thành công, decode token, dispatch `loginSuccess({ user, token })`.
- Khi logout, dispatch `logout()`.

Notes:
- Bạn có thể bảo vệ route thao tác CRUD bằng `isAuthenticated` từ state.

---

## Tích hợp trong components (tóm tắt)

- `Orchids.jsx`:
  - `useEffect(() => dispatch(fetchOrchids()), [dispatch])` để load list.
  - Lấy `filteredOrchids` từ `useSelector(state => state.orchids.filteredOrchids)` và hiển thị.
  - Gọi `dispatch(removeOrchid(id))` để xóa (nên `.unwrap()` để bắt lỗi).
  - Dispatch `setFilterCategory(value)` để lọc local.

- `OrchidDetail.jsx`:
  - `useEffect(() => dispatch(fetchOrchidById(id)), [dispatch, id])` để load detail.
  - Lấy `selectedOrchid`, `loading`, `error` từ state.
  - Khi unmount, dispatch `clearSelectedOrchid()`.

---

## Lệnh chạy & debug nhanh

1. Cài dependencies nếu chưa có (ở project root):
```bash
npm install
npm install axios @reduxjs/toolkit react-redux formik yup @react-oauth/google jwt-decode sass
```

2. Chạy dev server:
```bash
npm run dev
```

3. Nếu lỗi API: kiểm tra `VITE_API_BASE_URL` trong `.env` và test URL `/orchids` trực tiếp trong trình duyệt.

4. Mở devtools → Network để thấy các request và response. Xem Console để bắt lỗi JS.

---

## Lời khuyên & Next steps

- Kiểm tra `VITE_API_BASE_URL` để tránh duplicate resource path (ví dụ `/orchids/orchids`).
- Dùng `unwrap()` khi gọi async thunk để xử lý error ở component-level.
- Nếu muốn bảo mật hơn, sử dụng server hoặc token-based auth thật sự (MockAPI không kiểm soát user token mặc định).
- Thêm pagination / debounce cho search nếu dataset lớn.

---

Nếu bạn muốn, tôi có thể:
- Thêm ví dụ code cụ thể (copy/paste) cho `Orchids.jsx` và `OrchidDetail.jsx` để gọi các thunk và show error handling;
- Hoặc mở rộng file docs bằng phần API reference chi tiết cho từng hàm trong `api.js`.

Bạn muốn tôi tiếp tục với phần nào tiếp theo?