# Chroma Quest 🎮

A fast-paced color matching game designed for VR and Quest platforms. Test your reflexes and color recognition skills by matching target colors against the clock!

## 🎯 About the Project

**Chroma Quest** is an immersive color matching game built with React Native and Expo. Players are presented with a target color and must quickly identify and tap the matching color from multiple options. The game features:

- ⏱️ **30-second timed rounds** - Race against the clock
- 🎨 **Vibrant color palette** - Six beautiful colors to match
- 📊 **Score tracking** - Track your high scores
- 🎮 **Haptic feedback** - Feel the game with tactile responses
- 🌓 **Dark/Light mode support** - Automatic theme switching
- 🥽 **VR/Quest optimized** - Built for Meta Horizon OS devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Expo CLI
- Android Studio (for Android builds)
- Meta Quest device (for Quest builds)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd vr-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   pnpm start
   ```

## 🏗️ Building and Running

This project uses Expo's config plugin system to create separate build flavors for standard Android devices and Meta Horizon OS (Quest) devices.

### Build Variants Explained

The config plugin automatically creates two build flavors for your Android project:

- **`mobile`** - Standard Android build for phones and tablets
- **`quest`** - Build prepared for Horizon OS devices with VR-specific manifest and configuration

Each flavor has both **debug** and **release** variants:

| Variant | Description |
|---------|-------------|
| `mobileDebug` | Debug build for standard Android devices |
| `mobileRelease` | Production build for standard Android devices |
| `questDebug` | Debug build for Meta Horizon OS devices |
| `questRelease` | Production build for Meta Horizon OS devices |

### Why Two Build Variants?

**Mobile Build (`mobile`):**
- Standard Android configuration
- Optimized for touch interactions
- Regular Android manifest
- Works on phones and tablets

**Quest Build (`quest`):**
- VR-specific manifest entries
- Horizon OS device configuration
- Optimized for VR controllers and head tracking
- Includes Quest-specific permissions and features
- Supports Quest 2, Quest 3, and Quest 3S

### Running on Different Platforms

#### Development Builds

**Run on Standard Android (Mobile):**
```bash
npm run android
# or
npx expo run:android --variant mobileDebug
```

**Run on Meta Horizon devices (Quest):**
```bash
npm run quest
# or
npx expo run:android --variant questDebug
```

#### Production Builds

**Build for Standard Android:**
```bash
npm run android:release
# or
npx expo run:android --variant mobileRelease
```

**Build for Meta Quest:**
```bash
npm run quest:release
# or
npx expo run:android --variant questRelease
```

### Available Scripts

The following scripts are available in `package.json`:

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `expo start` | Start Expo development server |
| `android` | `expo run:android --variant mobileDebug` | Run mobile debug build |
| `quest` | `expo run:android --variant questDebug` | Run Quest debug build |
| `android:release` | `expo run:android --variant mobileRelease` | Build mobile release |
| `quest:release` | `expo run:android --variant questRelease` | Build Quest release |
| `ios` | `expo run:ios` | Run iOS build |
| `web` | `expo start --web` | Run web version |
| `lint` | `expo lint` | Run ESLint |

## 📱 Platform Support

- ✅ **Android** (Mobile & Quest)
- ✅ **iOS** (Mobile)
- ✅ **Web**
- ✅ **Meta Horizon OS** (Quest 2, Quest 3, Quest 3S)

## 🎮 How to Play

1. **Start the game** - Tap "Start Game" to begin
2. **Match colors** - A target color appears at the top
3. **Tap the match** - Select the matching color from the 4 options below
4. **Score points** - Each correct match increases your score
5. **Beat the clock** - You have 30 seconds to score as many points as possible
6. **Set records** - Try to beat your high score!

## 🛠️ Project Structure

```
vr-app/
├── app/
│   ├── _layout.tsx      # Root layout configuration
│   ├── index.tsx        # Main game screen
│   └── modal.tsx        # Modal screen
├── components/          # Reusable UI components
├── assets/             # Images, icons, and static assets
├── constants/          # App constants and theme
├── hooks/              # Custom React hooks
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Configuration

### Quest Configuration

The Quest build is configured in `app.json` using the `expo-horizon-core` plugin:

```json
{
  "plugins": [
    [
      "expo-horizon-core",
      {
        "horizonAppId": "your-horizon-app-id",
        "supportedDevices": "quest2|quest3|quest3s"
      }
    ]
  ]
}
```

**Important:** Update `your-horizon-app-id` with your actual Horizon App ID from the Meta Developer Portal.

## 📦 Dependencies

Key dependencies include:

- **expo** - Expo SDK
- **expo-router** - File-based routing
- **expo-horizon-core** - Meta Horizon OS support
- **expo-haptics** - Haptic feedback
- **react-native-reanimated** - Animations
- **react-native** - React Native framework

## 🐛 Troubleshooting

### Build Issues

If you encounter build errors:

1. Clear cache:
   ```bash
   npx expo start -c
   ```

2. Rebuild native code:
   ```bash
   npx expo prebuild --clean
   ```

3. Check Android Studio setup for proper SDK and build tools

### Quest-Specific Issues

- Ensure your Quest device is in Developer Mode
- Enable USB debugging on your Quest
- Verify ADB connection: `adb devices`
- Check that `expo-horizon-core` plugin is properly configured

## 📄 License

This project is private.

## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using Expo and React Native**
