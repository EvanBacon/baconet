# Using Firebase in Expo

## Build simple backends for your native app

### **Update (Dec 2022):**

> React Native Firebase now has official support for Expo Dev Clients. [Learn more](https://rnfirebase.io/#expo).
>
> # _You can read the now outdated original post below, if you would like to._

We are super excited to announce that we will be rolling out a suite of [Unimodules](https://www.youtube.com/watch?v=-9CJZRv7uOY) that will provide you with easy access to native Firebase features! initially you will only be able to use these in a detached ExpoKit App. But over time we will be working to add these to vanilla Expo.

### TL;DR

Here are the modules, you will need to detach to add them for now:

- [App/Core](https://www.npmjs.com/package/expo-firebase-app)

- [Analytics](https://www.npmjs.com/package/expo-firebase-analytics)

- [Authentication](https://www.npmjs.com/package/expo-firebase-auth)

- [Cloud Firestore](https://www.npmjs.com/package/expo-firebase-firestore)

- [Cloud Functions](https://www.npmjs.com/package/expo-firebase-functions)

- [Instance ID](https://www.npmjs.com/package/expo-firebase-instance-id)

- [Performance Monitor](https://www.npmjs.com/package/expo-firebase-performance)

- [Realtime Database](https://www.npmjs.com/package/expo-firebase-database)

- [Cloud Storage](https://www.npmjs.com/package/expo-firebase-storage)

- [Remote Config](https://www.npmjs.com/package/expo-firebase-remote-config)

- [Firebase Cloud Messaging](https://www.npmjs.com/package/expo-firebase-messaging)

- [Remote Notifications](https://www.npmjs.com/package/expo-firebase-notifications)

- [Dynamic Linking](https://www.npmjs.com/package/expo-firebase-links)

- [Invites](https://www.npmjs.com/package/expo-firebase-invites)

- [Crashlytics](https://www.npmjs.com/package/expo-firebase-crashlytics)

And the source code can be found here:
[**Firebase Modules**
*The Expo platform for making cross-platform mobile apps - expo/expo*github.com](https://github.com/expo/expo/tree/master/modules)

### Also TL;DR

Here is a boilerplate: [https://github.com/EvanBacon/expo-native-firebase](https://github.com/EvanBacon/expo-native-firebase)

### Why Detached Expo?

In the past if you wanted to add native Firebase to Expo, you needed to be an expert on the inter-workings of both libraries. This is counterintuitive to both Expo and Firebase’s philosophy of **“it just works”**.

These Unimodules were designed to be used in detached ExpoKit & vanilla React Native. Each module has detailed instructions on how to install, you should refer to the React Native Firebase docs on more detailed usage [https://rnfirebase.io/docs/master/getting-started](https://rnfirebase.io/docs/master/getting-started).

The goal was to make this as close to **React-Native-Firebase** as possible. We love how RNFirebase matches the Web SDK, this makes migration and cross-platform development a dream.

### What’s New?

The biggest change we made was moving each service into it’s own library. This means that each `expo-firebase` module will manage all of it’s own native code. Effectively cutting down on the amount of native code that you as a developer have to interact with.

Another huge request we’ve gotten is to make the apps slimmer. By having separate modules we can enable developers to create much slimmer apps. If there is a library you don’t want, or don’t need, just don’t include it!

### How to integrate

To get started you can install the core library `expo-firebase-app`. You can access any other imported firebase libraries through `expo-firebase-app`.

```js
import firebase from "expo-firebase-app";
```

Then to integrate any other library, you will need to install it & import it somewhere. You will only ever need to import it once, and before your initial usage.

```js
import firebase from "expo-firebase-app";
import "expo-firebase-database";

firebase.database();
```

If you are starting with Expo (recommended) then you can run the following commands:

```sh
expo init my-lit-app

cd my-lit-app

expo eject

yarn add expo-firebase-app
```

Simple libraries can be added with npm, then integrated like most Expo libraries. These libraries include:

- Analytics

- Authentication

- Firestore

- Functions

- Instance ID

- Performance Monitor

- Realtime Database

- Cloud Storage

- Remote Config

Some smaller aspects of each library may require extra lines to be added to the Android gradles.

The more complex libraries will require 2–3 extra steps, these are:

- Cloud Messaging

- Remote Notifications

- Dynamic Linking

- Invites

- Crashlytics

## What’s next

Ideally we will include most of the Firebase suite in the Expo client. This has been a very difficult challenge as Firebase is meant to be initialized natively.

By manipulating the framework, we were able to create methods for initializing native apps asynchronously in JS.

Of course there are still some features that will require detaching — but unlike before, this is a very straightforward, and documented process that will hopefully not be too scary.

Features like `Dynamic Linking`, `Invites`, and `Phone Auth` require custom **URI schemes** to be added to the native builds. Unfortunately there is no way around this, but overtime we hope to make this as easy as possible.

Feel free to reach out on [forums](http://forums.expo.io) or on twitter `**@expo`** if you have any questions! Also follow and subscribe to stay up-to-date on the Firebase integration 💙🔥
[**Evan Bacon 🥓 (@Baconbrix) | Twitter**
*The latest Tweets from Evan Bacon 🥓 (@Baconbrix). 20 💙 Adding Firebase & mapbox to @expo 🔥 Lego master builder 😱…*twitter.com](https://twitter.com/baconbrix)
[**EvanBacon/expo-native-firebase**
*An ExpoKit v30 project with expo-firebase added. . Contribute to EvanBacon/expo-native-firebase development by creating…*github.com](https://github.com/EvanBacon/expo-native-firebase)
[**Expo (@expo) | Twitter**
*The latest Tweets from Expo (@expo). Make & use native mobile apps written in just JavaScript using React Native. (Like…*twitter.com](https://twitter.com/expo)
[**React Native Firebase - Simple Firebase integration for React Native\*\*
*Simple Firebase integration for React Native with support for 10+ Firebase modules including Authentication, Analytics…*rnfirebase.io](https://rnfirebase.io/docs/master/getting-started)
