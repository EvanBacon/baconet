# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-react-native-app -t with-router
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
- [Request for Comments](https://github.com/expo/router/discussions/1)

# App Clip issues

- Info.plist: MinimumOSVersion: 16.0.0 -> 16.0
- Fonts not loading: ???
- Added to app entry: `process.env.IS_APP_CLIP = props.isClip;`
- HMR not working: https://developer.apple.com/forums/thread/652104
