// export const data = [
//   {
//     title: "Route Once with Expo Router",
//     themeColor: "#1D2025",
//     url: "https://twitter.com/Baconbrix/status/1593961233165811712?s=20&t=X5iV6XLEWGRWHQm9D3R67w",
//     // slug: "router",
//     subtitle: "Introducing the first File System-based router for native apps",
//     image: { uri: "/images/expo-router.png" },
//     video: { uri: "/videos/expo_for_web.mp4" },
//   },
//   // {
//   //   title: "Test Once with Expo Jest",
//   //   slug: "jest",
//   //   themeColor: "#674B39",
//   //   subtitle: "Smarter apps require smarter tests",
//   //   image: { uri: "/images/react-europe-1.jpg" },
//   //   video: { uri: "/videos/expo_for_web.mp4" },
//   // },
//   // {
//   //   title: "Run Once with Expo CLI",
//   //   themeColor: "#393229",
//   //   slug: "expo-cli",
//   //   subtitle: "Ground up rewrite of the Expo Dev Tools",
//   //   image: { uri: "/images/appjs-2022.jpg" },
//   //   video: { uri: "/videos/expo_for_web.mp4" },
//   // },
//   {
//     title: "Render Once with Expo Web",
//     themeColor: "#F3F3F3",
//     slug: "expo-web",
//     url: "https://www.youtube.com/watch?v=k1FdrhA2sCY",
//     subtitle: "Instant access and searchability",
//     image: { uri: "/images/expo-for-web-reactive.jpg" },

//     video: { uri: "/videos/expo_for_web.mp4" },
//   },
//   // {
//   //   title: "Write Once with Expo",
//   //   themeColor: "#17171E",
//   //   slug: "write-once",
//   //   subtitle: "Universal React apps as a reality",
//   //   url: "https://www.youtube.com/watch?v=uyZslq7Jsno",
//   //   image: { uri: "/images/appjs-2022.jpg" },
//   //   video: { uri: "/videos/expo_for_web.mp4" },
//   // },
//   {
//     title: "Play Once with Expo GL",
//     themeColor: "#17171E",
//     url: "https://www.youtube.com/watch?v=oHBGhHlVOI0",
//     subtitle: "Universal React apps as a reality",
//     image: { uri: "/images/react-europe-1.jpg" },

//     // image: { uri: "/images/debut-expo-web.jpg" },
//     video: { uri: "/videos/expo_for_web.mp4" },
//   },
// ];

const origin = process.env.EXPO_ORIGIN ?? "";

export const data = [
  {
    title: "Route Once with Expo Router",
    themeColor: "#1D2025",
    url: "https://twitter.com/Baconbrix/status/1593961233165811712?s=20&t=X5iV6XLEWGRWHQm9D3R67w",
    // slug: "router",
    subtitle: "Introducing the first File System-based router for native apps",
    image: { uri: origin + "/images/expo-router.png" },
    video: { uri: "/videos/expo_for_web.mp4" },
  },
  // {
  //   title: "Test Once with Expo Jest",
  //   slug: "jest",
  //   themeColor: "#674B39",
  //   subtitle: "Smarter apps require smarter tests",
  //   image: { uri: origin + "/images/react-europe-1.jpg" },
  //   video: { uri: "/videos/expo_for_web.mp4" },
  // },
  // {
  //   title: "Run Once with Expo CLI",
  //   themeColor: "#393229",
  //   slug: "expo-cli",
  //   subtitle: "Ground up rewrite of the Expo Dev Tools",
  //   image: { uri: origin + "/images/appjs-2022.jpg" },
  //   video: { uri: "/videos/expo_for_web.mp4" },
  // },
  {
    title: "Render Once with Expo Web",
    themeColor: "#F3F3F3",
    slug: "expo-web",
    url: "https://www.youtube.com/watch?v=k1FdrhA2sCY",
    subtitle: "Instant access and searchability",
    image: {
      uri: origin + "/images/expo-for-web-reactive.jpg",
    },

    video: { uri: "/videos/expo_for_web.mp4" },
  },
  // {
  //   title: "Write Once with Expo",
  //   themeColor: "#17171E",
  //   slug: "write-once",
  //   subtitle: "Universal React apps as a reality",
  //   url: "https://www.youtube.com/watch?v=uyZslq7Jsno",
  //   image: { uri: origin + "/images/appjs-2022.jpg" },
  //   video: { uri: "/videos/expo_for_web.mp4" },
  // },
  {
    title: "Play Once with Expo GL",
    themeColor: "#17171E",
    url: "https://www.youtube.com/watch?v=oHBGhHlVOI0",
    subtitle: "Universal React apps as a reality",
    image: { uri: origin + "/images/react-europe-1.jpg" },

    // image: { uri: origin + "/images/debut-expo-web.jpg" },
    video: { uri: "/videos/expo_for_web.mp4" },
  },
];
