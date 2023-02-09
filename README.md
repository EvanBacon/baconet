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
- Added to app entry: `process.env.IS_APP_CLIP = props.isClip;`
- HMR not working: https://developer.apple.com/forums/thread/652104
- Fonts not loading: ???

```
2023-02-08 15:47:40.432012-0600 Baconet Clip[19023:5361371] Task <A9C5BDEE-FEAC-401F-9CDD-68818DCD1D5A>.<1> finished with error [-1] Error Domain=NSURLErrorDomain Code=-1 "unknown error" UserInfo={NSErrorFailingURLStringKey=http://192.168.1.67:8081/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf?platform=ios&hash=b3263095df30cb7db78c613e73f9499a, NSErrorFailingURLKey=http://192.168.1.67:8081/assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf?platform=ios&hash=b3263095df30cb7db78c613e73f9499a, _NSURLErrorRelatedURLSessionTaskErrorKey=(
```

vvvv

- AppClip failed to download file with NSURLSessionDownloadTask - https://developer.apple.com/forums/thread/669148?answerId=653341022#653341022
- It would appear that `expo-file-system` is using background tasks which aren't supported in App Clips >:[ Patching `expo-asset` with the following:

```
/**
 * Just download the asset, don't perform integrity check because we don't have
 * the hash to compare it with (we don't have hashAssetFiles plugin). Hash is
 * only used for the file name.
 */
async function _downloadAsyncUnmanagedEnv(uri, hash, type) {
    // TODO: does this make sense to bail out if it's already at a file URL
    // because it's already available locally?
    if (uri.startsWith('file://')) {
        return uri;
    }
    const cacheFileId = hash || computeMd5(uri);
    const localUri = `${FileSystem.cacheDirectory}ExponentAsset-${cacheFileId}.${type}`;
    // We don't check the FileSystem for an existing version of the asset and we
    // also don't perform an integrity check!
    await FileSystem.downloadAsync(uri, localUri, {
        sessionType: process.env.IS_APP_CLIP ? FileSystem.FileSystemSessionType.FOREGROUND : FileSystem.FileSystemSessionType.BACKGROUND,
    });
    return localUri;
}
//# sourceMappingURL=PlatformUtils.js.map
```

- Maybe read if `NSAppClip` is in the Info.plist and use `FOREGROUND` if so?
- Had to manually drop iPad support: `❌  error: The UIDeviceFamily of an App Clip ('[1, 2]') must be equal to the UIDeviceFamily of its containing parent app ('[1]').`

### App Clip Web Setup

- Updated AASA [ref](https://developer.apple.com/documentation/app_clips/associating_your_app_clip_with_your_website)
  - Not required but AR support requires the parent bundle ID too: [ref](https://developer.apple.com/documentation/app_clips/interacting_with_app_clip_codes_in_ar)
- Added associated domains: `applinks:everywhere.run`

From a different guide

- Added the metatag `<meta name="apple-itunes-app" content="app-id=6443850777, app-clip-bundle-id=app.baconet.Clip, app-clip-display=card">` to the Root Layout in Expo Router: [ref](https://developer.apple.com/documentation/app_clips/supporting_invocations_from_your_website_and_the_messages_app)
