# Lab 6 - Orchid Gallery with Fetch API & Redux

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install axios @reduxjs/toolkit react-redux formik yup @react-oauth/google jwt-decode sass
```

### 2. Setup MockAPI

1. Go to [mockapi.io](https://mockapi.io/)
2. Create a new project
3. Create an endpoint called `orchids` with the following schema:

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "origin": "string",
  "color": "string",
  "rating": "number",
  "image": "string",
  "isSpecial": "boolean",
  "isNatural": "boolean",
  "numberOfLike": "number"
}
```

4. Copy your project URL (e.g., `https://675d123456789.mockapi.io/api/v1`)
5. Update `.env` file with your MockAPI URL

### 3. Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins:
   - `http://localhost:5173`
   - Your production URL
6. Copy your Client ID
7. Update `.env` file with your Google Client ID

### 4. Update Environment Variables

Edit `.env` file:

```env
VITE_API_BASE_URL=https://YOUR_PROJECT_ID.mockapi.io/api/v1
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
```

### 5. Update API Service

Edit `src/services/api.js` and update the BASE_URL:

```javascript
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

### 6. Run the Application

```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx          # Google Login component
│   │   └── Login.scss         # Login styles
│   └── Forms/
│       ├── OrchidForm.jsx     # Formik form for CRUD
│       └── OrchidForm.scss    # Form styles
├── services/
│   └── api.js                 # Axios & Fetch API calls
├── store/
│   ├── slices/
│   │   ├── orchidSlice.js     # Redux slice for orchids
│   │   └── authSlice.js       # Redux slice for auth
│   └── store.js               # Redux store configuration
└── assets/
    └── SCSS/
        └── _variables.scss    # SCSS variables
```

## 🔧 Features

### ✅ Implemented:
- [x] Redux Toolkit for state management
- [x] Axios & Fetch API for HTTP requests
- [x] Formik & Yup for form validation
- [x] Google OAuth login
- [x] CRUD operations (Create, Read, Update, Delete)
- [x] Search and filter functionality
- [x] SCSS styling with variables and mixins
- [x] Responsive design
- [x] Loading states and error handling

### 📝 API Endpoints:

- `GET /orchids` - Get all orchids
- `GET /orchids/:id` - Get orchid by ID
- `POST /orchids` - Create new orchid
- `PUT /orchids/:id` - Update orchid
- `DELETE /orchids/:id` - Delete orchid

### 🎨 Form Validation Rules:

- **Name**: Required, 3-50 characters
- **Category**: Required
- **Origin**: Required, min 2 characters
- **Color**: Required
- **Rating**: Required, 1-5
- **Image**: Required, must be valid URL
- **Likes**: Optional, cannot be negative

## 🚀 Usage

### Login:
1. Click "Sign in with Google" button
2. Select your Google account
3. Grant permissions
4. You'll be redirected to the home page

### Create Orchid:
1. Click "+ Add Orchid" button
2. Fill in the form
3. Click "Create Orchid"

### Edit Orchid:
1. Click "Edit" button on an orchid card
2. Modify the form
3. Click "Update Orchid"

### Delete Orchid:
1. Click "Delete" button on an orchid card
2. Confirm deletion

### Search & Filter:
1. Use the search bar to search by name
2. Use category dropdown to filter

## 🔐 Protected Routes

Some actions require authentication:
- Create orchid
- Update orchid
- Delete orchid

## 📱 Responsive Design

- Mobile: < 576px
- Tablet: 576px - 992px
- Desktop: > 992px

## 🐛 Troubleshooting

### CORS Error:
MockAPI should allow CORS by default. If you get CORS error, check your MockAPI project settings.

### Google Login Not Working:
1. Check if Client ID is correct in `.env`
2. Check if authorized origins are added in Google Console
3. Make sure you're using `http://localhost:5173` (not https)

### Redux DevTools:
Install Redux DevTools extension for Chrome/Firefox to debug state changes.

## 📚 Technologies Used

- React 19
- Redux Toolkit
- React Router v7
- Axios
- Formik & Yup
- Google OAuth (@react-oauth/google)
- SCSS/SASS
- Vite

## 👨‍💻 Author

Your Name - FPT University
