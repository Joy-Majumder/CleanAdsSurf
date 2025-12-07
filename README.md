# CleanAdsSurf - Chrome Extension

A privacy-focused Chrome extension that blocks intrusive ads and malicious content with real-time statistics, per-domain controls, and a beautiful light/dark theme UI.

## Features

✨ **Ad Blocking**
- Blocks major ad networks (Google, Doubleclick, Taboola, Outbrain, Criteo, etc.)
- Blocks generic tracking patterns and malware delivery networks
- YouTube & video platform protection (doesn't interfere with video playback)

📊 **Real-Time Statistics**
- View today's blocked ads in the popup
- Total blocked ads across all time
- Historical stats tracking (last 14 days)
- Visual charts and analytics in dashboard

🎛️ **Domain Controls**
- Enable/disable protection globally with one click
- Per-domain whitelisting/blacklisting
- Toggle protection for individual websites
- Persistent settings across sessions

🌓 **Theme Support**
- Beautiful dark mode (default)
- Professional light mode
- Remembers your preference

🔐 **Authentication System**
- Login/signup pages with backend API
- Chrome Storage integration
- Demo credentials: `admin` / `admin`

## Installation

### Prerequisites
- Chrome browser (version 114+)
- Node.js (for running the backend API)
- npm or yarn

### Step 1: Clone or Download

```bash
git clone <repository-url>
cd ADs
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-Origin Resource Sharing middleware

### Step 3: Start the Backend API

```bash
npm start
# or
node server.js
```

The API will run on `http://localhost:3000` with these endpoints:
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `GET /health` - Health check

### Step 4: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the project directory (where `manifest.json` is located)
5. The CleanAdsSurf extension will appear in your extensions list

### Step 5: Activate the Extension

**Option A: Via Popup Menu**
1. Click the CleanAdsSurf icon in your Chrome toolbar
2. The popup shows statistics and per-domain controls
3. Toggle protection on/off or configure individual sites

**Option B: Via Dashboard**
1. Click the CleanAdsSurf icon → "Options" (or right-click → Options)
2. Opens the full dashboard with advanced controls
3. View historical charts, manage all domain settings

**Option C: Via Login Page**
1. Click the CleanAdsSurf icon
2. Select "Login" to go to the authentication page
3. Use demo credentials: `admin@example.com` / `admin`
4. After login, you're taken to the popup dashboard

## How to Use

### Quick Start

1. **Open any website** - ads will automatically be blocked
2. **Click the CleanAdsSurf icon** to see statistics
3. **View real-time stats:**
   - Today's blocked ads
   - Total blocked ads (all time)
   - Current domain status

### Popup Controls

| Button | Function |
|--------|----------|
| **Global Toggle** | Enable/disable protection for all websites |
| **Domain Toggle** | Whitelist/blacklist current domain |
| **Refresh** | Manually refresh statistics |
| **Theme Toggle** | Switch between dark and light mode |

### Dashboard Features

Access the full dashboard for advanced control:

1. **Global Protection** - Master on/off switch
2. **Domain Management** - Manage individual site permissions
3. **Statistics View** - Detailed charts and history
4. **Theme Settings** - Dark/light mode preference
5. **Historical Data** - Last 14 days of blocking stats

## Authentication

### Demo Credentials

```
Username: admin
Email: admin@example.com
Password: admin
```

### Login Flow

1. Click CleanAdsSurf icon → Click "Login"
2. Enter credentials (or create new account)
3. Backend validates and stores in Chrome Storage
4. User info persists across sessions

### Authentication Pages

- **Login**: `login.html` - Sign in with existing credentials
- **Signup**: `signup.html` - Create new account
- **Backend**: `server.js` + `routes/auth.js` - API endpoints

## Project Structure

```
ADs/
├── manifest.json              # Extension configuration
├── background.js              # Service worker (ad blocking logic)
├── content.js                 # Content script
├── server.js                  # Backend API server
├── package.json               # Node dependencies
├── auth.css                   # Auth page styling
├── login.html                 # Login page
├── signup.html                # Signup page
├── login.js                   # Login logic
├── signup.js                  # Signup logic
├── popup/
│   ├── popup.html            # Popup UI
│   ├── popup.js              # Popup logic
│   └── popup.css             # Popup styling
├── dashboard/
│   ├── dashboard.html        # Dashboard UI
│   ├── dashboard.js          # Dashboard logic
│   └── dashboard.css         # Dashboard styling
├── routes/
│   └── auth.js               # Authentication endpoints
├── assets/
│   ├── icon16.png            # Extension icon 16x16
│   ├── icon48.png            # Extension icon 48x48
│   └── icon128.png           # Extension icon 128x128
├── data/
│   └── stats.json            # Sample data
└── AUTH_SETUP.md             # Detailed authentication guide
```

## Blocking Rules

The extension blocks:

### Ad Networks (Rules 1-8, 20-21)
- `doubleclick.net` - Google Ads
- `googlesyndication.com` - Google ad syndication
- `adservice.google.com` - Google ad service
- `adsafeprotected.com` - Ad safety
- `taboola.com` - Content recommendation ads
- `outbrain.com` - Content recommendation ads
- `criteo.com` - Retargeting ads
- `scorecardresearch.com` - Tracking
- Generic patterns: `*adtrack*`, `*://*/ads/*`

### Malware/Badware (Rules 40-43)
- `malwaredelivery.com`
- `ransomwaretracker.com`
- `*.exe` files
- `*.apk` files

### YouTube Protection
- YouTube, youtu.be, m.youtube.com - **Whitelisted** (not blocked)
- googlevideo.com, videodelivery.net - **Whitelisted** (video delivery)

## Troubleshooting

### Extension Won't Load

**Error**: "Failed to load extension"

**Solution**:
1. Check `manifest.json` is valid JSON
2. Ensure `background.js` has no syntax errors
3. Run: `node -c background.js` to validate
4. Check Chrome console (F12) for detailed error

### YouTube Videos Not Playing

**Error**: Videos buffer but don't start

**Solution**:
- ✅ Already fixed! YouTube domains are whitelisted
- Disable extension and reload page to test
- Check popup to ensure "Global Protection" is enabled

### Login Not Working

**Error**: "Unable to reach server"

**Solution**:
1. Ensure backend is running: `npm start`
2. Backend must run on `http://localhost:3000`
3. Check backend console for errors
4. Verify CORS is enabled in `server.js`

### No Statistics Showing

**Error**: "0 ads blocked" even on ad-heavy sites

**Solution**:
1. Ensure extension is enabled in popup
2. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
3. Check extension permissions:
   - Go to `chrome://extensions/CleanAdsSurf/Details`
   - Verify "Allow on all sites" is enabled
4. Check background.js service worker in DevTools

### Stats Not Updating

**Error**: Statistics show but don't increment

**Solution**:
1. Click "Refresh" button in popup
2. Check that `declarativeNetRequest` API is working:
   - Open DevTools (F12)
   - Go to Console tab
   - Check for API errors
3. Verify rule IDs don't conflict (1-8, 20-21, 40-43)

## Development

### Debug Mode

1. Open `chrome://extensions/`
2. Find CleanAdsSurf
3. Click **Details**
4. Under "Service Worker", click **Inspect** to debug background.js
5. Under "inspect views", click popup to debug popup.js

### Testing Rules

Validate ad-blocking rules:

```bash
node test-rules.js
```

### API Testing

Test backend endpoints:

```bash
# Health check
curl http://localhost:3000/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"admin","password":"admin"}'

# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"pass","confirmPassword":"pass"}'
```

## Performance

- **Lightweight**: Minimal JS, efficient CSS
- **Fast blocking**: Declarative Net Request API (Chrome native)
- **Low memory**: Service worker only loads on demand
- **Optimized rules**: 14 core rules, no regex complexity

## Privacy

- **No tracking**: No external API calls
- **Local storage only**: All data stays in Chrome Storage
- **No logs**: Activity not sent anywhere
- **Open source**: Review the code yourself

## Browser Support

- Chrome 114+ (Manifest V3)
- Brave, Edge, and other Chromium-based browsers

## Future Enhancements

- [ ] Real database (MongoDB/PostgreSQL)
- [ ] JWT token authentication
- [ ] Password hashing (bcrypt)
- [ ] Email verification
- [ ] Custom rule creation
- [ ] Whitelist/blacklist management UI
- [ ] Export statistics
- [ ] Dark web monitoring integration

## License

MIT License - See LICENSE file for details

## Support

For issues, bugs, or feature requests:
1. Check the Troubleshooting section above
2. Review `AUTH_SETUP.md` for auth-specific help
3. Check Chrome DevTools console for error messages
4. Ensure backend is running on port 3000

---

**CleanAdsSurf** - Clean browsing. Your privacy matters.