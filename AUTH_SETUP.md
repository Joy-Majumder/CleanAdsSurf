# CleanAdsSurf Authentication System

A complete login + signup authentication system for the CleanAdsSurf Chrome extension.

## Overview

This authentication system includes:

- **Backend API** (Node.js + Express)
- **Frontend Pages** (Login & Signup HTML/CSS/JS)
- **In-memory storage** for demo purposes
- **Clear TODO comments** marking where JWT tokens, password hashing, and real database persistence will go in future versions

### Current Features

[+] Signup form with password confirmation
[+] Login form with credential validation
[+] Backend API with mock user (`admin`/`admin`)
[+] Chrome extension storage integration
[+] Clean, modern UI with dark/light mode support
[+] Comprehensive inline documentation
[+] CORS enabled for development

### Demo Credentials

For testing, use:
- **Username**: `admin`
- **Email**: `admin@example.com` or `admin`
- **Password**: `admin`

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Chrome browser

### Backend Setup

#### 1. Install Dependencies

```bash
cd /path/to/ADs
npm install
```

Required packages (ensure they're in `package.json`):
- `express`
- `cors`

#### 2. Start the Backend Server

```bash
npm start
```

Or directly:

```bash
node server.js
```

You should see:

```
🚀 CleanAdsSurf API server running at http://localhost:3000
📚 Available endpoints:
   POST   /api/auth/signup
   POST   /api/auth/login
   GET    /api/auth/me
   GET    /health

⚠️  Dummy credentials for testing:
   Username: admin
   Password: admin
```

### Frontend Setup

The frontend files are ready to use:

1. **`login.html`** - Login page
2. **`signup.html`** - Signup page
3. **`auth.css`** - Shared styles
4. **`login.js`** - Login form logic
5. **`signup.js`** - Signup form logic

To open them during development:

- Open `login.html` in a browser: `file:///path/to/ADs/login.html`
- Or load them as extension pages in your Chrome extension manifest

---

## 📡 API Endpoints

All endpoints are prefixed with `/api/auth`:

### POST `/api/auth/signup`

Create a new user account.

**Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Signup successful (demo mode - no persistence yet).",
  "user": {
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Passwords do not match."
}
```

---

### POST `/api/auth/login`

Log in with username/email and password.

**Request:**
```json
{
  "usernameOrEmail": "admin",
  "password": "admin"
}
```

**Success Response (200):**
```json
{
  "user": {
    "username": "admin",
    "email": "admin@example.com",
    "plan": "free"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials."
}
```

---

### GET `/api/auth/me`

Get current logged-in user info.

**Success Response (200):**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "plan": "free"
}
```

---

## 🎨 Frontend Structure

### Login Flow

1. User opens `login.html`
2. Enters email/username and password
3. Clicks "Login" button
4. `login.js` sends POST to `/api/auth/login`
5. On success:
   - User data saved in Chrome extension storage (`chrome.storage.local`)
   - Redirected to `popup/popup.html`
6. On error:
   - Error message displayed in red

### Signup Flow

1. User opens `signup.html`
2. Fills in username, email, password, confirm password
3. Clicks "Sign Up" button
4. `signup.js` validates passwords match
5. Sends POST to `/api/auth/signup`
6. On success:
   - Redirected to `login.html`
7. On error:
   - Error message displayed in red

### Styling

- **Dark mode** (default): Dark background with blue accent
- **Light mode**: Detected via CSS media query `prefers-color-scheme: light`
- **CSS Variables**: All colors use CSS variables for easy customization

---

## 🔐 Future Enhancements

The codebase includes TODO comments marking where the following should be implemented:

### Backend (`server.js`, `routes/auth.js`)

- [ ] Replace in-memory user store with real database (MongoDB, PostgreSQL, etc.)
- [ ] Implement password hashing with bcrypt
- [ ] Generate JWT access and refresh tokens
- [ ] Add JWT verification middleware for protected routes
- [ ] Implement email verification flow
- [ ] Add password reset functionality
- [ ] Rate limiting for login attempts

### Frontend (`login.js`, `signup.js`)

- [ ] Store JWT tokens in Chrome extension storage (instead of just `userLoggedIn` flag)
- [ ] Implement token refresh logic
- [ ] Add loading states to buttons
- [ ] Client-side password strength validation
- [ ] Email format validation
- [ ] Integration with popup to display user-specific stats

---

## 📂 File Structure

```
ADs/
├── server.js                 # Express backend entry point
├── routes/
│   └── auth.js              # Authentication routes (signup, login, me)
├── login.html               # Login page
├── signup.html              # Signup page
├── auth.css                 # Shared authentication styles
├── login.js                 # Login form logic
├── signup.js                # Signup form logic
├── package.json             # Node.js dependencies
└── AUTH_SETUP.md            # This file
```

---

## 🛠️ Troubleshooting

### "Unable to reach server" error

- Ensure backend is running: `npm start`
- Check that it's listening on `http://localhost:3000`
- Verify CORS is enabled (it should be by default)

### CORS error in browser console

- Backend should have `cors()` middleware enabled
- Check `server.js` has `app.use(cors())`

### Login with `admin`/`admin` not working

- Verify you're using the correct credentials:
  - Username: `admin` OR Email: `admin@example.com`
  - Password: `admin`
- Check backend console for error messages

### Signup creates user but login fails

- In demo mode, new users are stored in-memory only
- Users are lost when server restarts
- TODO: Implement real database to persist users

---

## 📝 License

Part of the CleanAdsSurf project.

---

## 🤝 Contributing

When adding features:

1. Keep security in mind (especially with tokens and passwords)
2. Add inline comments marking TODO items for future work
3. Test both frontend and backend
4. Update this README with new endpoints or features

---

## 📞 Support

For issues or questions, refer to the TODO comments in the code which indicate where features need to be implemented.
