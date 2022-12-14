# Instagram Clone (!) using Firebase, React Native & Expo.

## Because there just aren’t enough yet… 😂

**TL;DR: [Here’s the code](https://github.com/EvanBacon/firebase-instagram)**

Have you ever noticed how on the internet there are just no pictures, all plain text, or how you don’t run a successful photo sharing company? Well, today we can change that because I’ve got some dope code for you to clone and mess with 😄😙

This app will allow you to scroll through everyone’s photos, read descriptions, choose or take photos, and upload them for the world to see! :)

**NOTE:** Because this is a pretty big demo project, I’m mostly just going to show and explain commented code, so it’s not actually a line-by-line tutorial: you should know a _little_ about React Native views, and Javascript. You won’t actually “_learn_” anything here 🤓.

![](./images/1VA648isgIrFameDyACrgug.gif)

![](./images/1HtR9_F4Uu0gZ-Wf9rhu5_Q.gif)

<Snack url="https://snack.expo.io/embedded/@bacon/github.com-evanbacon-firebase-instagram@@evanbacon-tutorial"/>

## Tech Stack

In this project I use a combination of all the best stuff the internet has to offer right now:

- Expo — RN APIs

- React Native — Cross-platform development framework

- Firebase — Database designed for simpler people, like me

- React Navigation — Super easy way to push screens in React Native

I use VSCode to make RN apps, but you could also use vim if you’re crazy.

### Set up Firebase

Firebase is a dead-easy solution for creating a database. It’s super cheap (you prolly won’t hit the limit, so free). It’s fast, and there are lots of tutorials about it (excluding this one 😜).

We’ll use lots of pictures, as it;s much harder to misspell pictures.

Go to [the console](https://console.firebase.google.com/u/0/) and make a new app — or just use my keys (I left them in the repo):

![](./images/1i7KAJG3hYZTj2gWTpUzGgg.png)

### Database

We’ll use the Cloud Firestore to save our posts. The Firestore is similar to a relational database in that you can use compound queries to get data. Firestore is more scalable than the traditional Firebase database: it’s more expensive in the long run, but you pay for the peace of mind that you won’t need to do some massive data migration in the future.

Compound queries are usually overkill but eh..why not 😏 Navigate over to the “Database” tab and click “Create Database”. We want to start in test mode so we can actually add data. This isn’t a permanent solution as this means anyone can edit everyone’s data.

![](./images/1nAJ4SoFD_PQd1N6kB-CtlQ.png)

![Look, it was just redesigned…again](./images/16ceVYnXhFwixs2t1G3AedA.png)_Look, it was just redesigned…again_

### Storage

Next go to the storage tab and setup the storage bucket. It’s pretty straightforward.

![](./images/1t8H5D9E2smKjkFp3BJ5UUg.png)

As you probably didn’t notice, the rules above state that you must be authenticated to read/write to the storage bucket. The most basic form of authentication is Anonymous authentication. Some of my feelings on why it’s the best [here](https://forums.expo.io/t/firebase-passwordless-signup/11033).

Click the Authentication tab and press “Set up sign-in method”. Now scroll down and tap the “Anonymous” cell, flip that switch, ignore the description, and press “Save”. 😁

![](./images/13PGayju1C7fTXPAFFkooDw.png)

![BTW: The bad guy in Tron is named “CLU”](./images/1eTp2dD8xT1GGYzeQhEf8KA.png)_BTW: The bad guy in Tron is named “CLU”_

### Configuration

Finally go back to the main project page and click the “&lt;/&gt;” button. Copy the config somewhere cuz we’ll need it later.

The config allows us to access the database. People can pretty easily get your credentials so they aren’t really secret. That’s why we add rules, but not today! 🙃

![](./images/1bnY3KUIYg4xfIrVk0ObxXQ.png)

![](./images/17z8u7VqcJakJKor7KWlhHQ.png)

## Building the Clone

[I’ve gotten in cyber-trouble for cloning things in the past](https://youtu.be/oHBGhHlVOI0?t=346), so for the sake of this blog post let’s call our photo sharing, social networking application…🤔… Instagram 😈

Here is a carefully calculated diagram of what I’ve constructed today…

![](./images/1h0rD0cnrzrZBIfUZDFMDNw.png)

### Playing with the source

You should build this app locally with `exp` as Firebase doesn’t work well with snack.expo.io.

### **Navigation**

The structure of our app is pretty simple: we’ll have a TabNavigator that switches us between the Feed Screen and the Upload Screen. Then we’ll wrap that in a StackNavigator that allows us to push a NewPost screen.

The reason the StackNavigator is at the top most level is because as you can see from the middle image, there is no tab bar. This means that the TabNavigator must be a child of the StackNavigator.

We will also define the global background color with `cardStyle.`

```js
// ./App.js

// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";

import tabBarIcon from "./utils/tabBarIcon";
// Import the screens
import FeedScreen from "./screens/FeedScreen";
import NewPostScreen from "./screens/NewPostScreen";
import SelectPhotoScreen from "./screens/SelectPhotoScreen";

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon("home"),
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon("add-circle"),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "black",
      inactiveTintColor: "gray",
    },
  }
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: "Instaham 🐷" },
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen,
  },
  {
    cardStyle: { backgroundColor: "white" },
  }
);

// Export it as the root component
export default stackNavigator;
```

### **Firebase data module**

We’ll handle all the Firebase stuff in one concise location called `Fire.js`.

First, we have to initialize the Firebase app, then check the authentication of the user. If the user isn’t authenticated, then we need to sign them in anonymously.

```js
// ./Fire.js

import uuid from "uuid";

import getUserInfo from "./utils/getUserInfo";
import shrinkImageAsync from "./utils/shrinkImageAsync";
import uploadPhoto from "./utils/uploadPhoto";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const collectionName = "snack-SJucFknGX";

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyAQan8_IJ6fY6F8E06FMDKVbWlrdI75mvA",
      authDomain: "instahamm-b09ce.firebaseapp.com",
      databaseURL: "https://instahamm-b09ce.firebaseio.com",
      projectId: "instahamm-b09ce",
      storageBucket: "instahamm-b09ce.appspot.com",
      messagingSenderId: "716190466061",
    });
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy("timestamp", "desc").limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function (doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || "Secret Duck").trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async (uri) => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const {
        uri: reducedImage,
        width,
        height,
      } = await shrinkImageAsync(localUri);

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.collection.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user: getUserInfo(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
```

Let me explain this all really quick…

**Downloading Data
**There’s a function called `getPaged` which will retrieve data using a pagination method, then return a cursor for future paging, and the data payload in a reduced format. More on this later…

**Uploading Data
**We will pass a local image URI and a text description to the `post` method. We will then shrink the image to a nice (affordable) size 😇

**Note on reducing image size:** My first social network completely crumbled when the first user posted the first picture, which was a 20mb HD picture of the rapper [Future](<https://en.wikipedia.org/wiki/Future_(rapper)>). 😩

After we have the reduced image and some user info, we will upload the image using a helper function which wraps the firebase storage upload process, and returns a download URL: [https://github.com/EvanBacon/firebase-instagram/blob/%40evanbacon/tutorial/utils/uploadPhoto.js](https://github.com/EvanBacon/firebase-instagram/blob/%40evanbacon/tutorial/utils/uploadPhoto.js)

Then to actually upload data just:

```js
this.collection.add({ some data })
```

**Helpers**

Finally we will make some getters that help us get the UID, timestamp, and posts collection.

### A closer look at getting paged data

First we need a reference to the collection (complex parent nodes) we want to read from. Then we’ll attach a query to it that returns docs (child nodes) sorted by the child key `timestamp` . Also notice that we limit the payload to a page size.

```js
let ref = firebase.firestore().collection(collectionName);
ref.orderBy("timestamp", "desc").limit(size);
```

If a cursor is present then we can attach it to the query. This allows us to effectively paginate complex data sets 😍

```js
ref = ref.startAfter(start);
```

Now we can get the data, and reduce it into a nice format for the UI.

```js
const querySnapshot = await ref.get();
const data = [];
querySnapshot.forEach(function (doc) {
  if (doc.exists) {
    const post = doc.data();
  }
});
```

and finally to get the next page cursor:

```js
const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
```

And that’s all it takes! (Kinda complex, actually 😅.)

![But hopefully I made it a little simpler for you :}](./images/1HpRCfDzG0n60f53NYcmmpg.gif)_But hopefully I made it a little simpler for you :}_

### Feed Screen

Here we will create a FlatList that loads data with actions at the top and bottom.

**Initial data**

When the component loads, we check to see if the user is signed in; if they aren’t then we will wait until `Fire.js` has signed us in. Once we have resolved our auth status, we want to call `makeRemoteRequest` which will call our database and request a paginated set of data. The page is determined by `PAGE_SIZE` and `this.lastKnownKey`. On the first load we won’t have a cursor and the database will pull from the most recent five images.

**Load More
**We have a clever little footer that will request more data when pressed. The reason we do this is because it’s the simplest way to avoid multiple calls when there isn’t enough data or when debugging.

**Pull-to-Refresh
**The user may want to see the latest and greatest content, to do so we must request data without the last known key. This will make our database get the most recent data.

**One other cool thing
**Sometimes loading in data can be a really janky process and it won’t look very good. To avoid this, use the `LayoutAnimation` API which automatically animates layout changes — life is gooood.

```js
// screens/FeedScreen.js

import firebase from "firebase";
import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";

import List from "../components/List";
import Fire from "../Fire";

// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;

export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
  };

  componentDidMount() {
    // Check if we are signed in...
    if (Fire.shared.uid) {
      // If we are, then we can get the first 5 posts
      this.makeRemoteRequest();
    } else {
      // If we aren't then we should just start observing changes. This will be called when the user signs in
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.makeRemoteRequest();
        }
      });
    }
  }

  // Append the item to our states `data` prop
  addPosts = (posts) => {
    this.setState((previousState) => {
      let data = {
        ...previousState.data,
        ...posts,
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp),
      };
    });
  };

  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async (lastKey) => {
    // If we are currently getting posts, then bail out..
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const { data, cursor } = await Fire.shared.getPaged({
      size: PAGE_SIZE,
      start: lastKey,
    });

    this.lastKnownKey = cursor;
    // Iteratively add posts
    let posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({ loading: false });
  };

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest();

  // If we press the "Load More..." footer then get the next page of posts
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    // Let's make everything purrty by calling this method which animates layout changes.
    LayoutAnimation.easeInEaseOut();
    return (
      <List
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._onRefresh}
          />
        }
        onPressFooter={this.onPressFooter}
        data={this.state.posts}
      />
    );
  }
}
```

![Not seeing a lot of those pictures I promised…](./images/1DbXHYDRXIY76SySED_3IYQ.gif)_Not seeing a lot of those pictures I promised…_

### **Picking Media**

Users will want to add data: to do this we will need access to the camera and gallery. `**SelectPhotoScreen.js` \*\*will implement buttons that can ask for permission to use `CAMERA` or `CAMERA_ROLL` permission using the `Expo.Permissions` API. Then it’ll open the corresponding selection screen using the `Expo.ImagePicker` API.

You could build the exact Instagram API using `Expo.Camera` & `Expo.MediaLibrary` for the gallery… I just didn’t have time :]

(Read more in the [docs for our Expo APIs](https://docs.expo.io/versions/v28.0.0/sdk/).)

After the user has selected the media, push the description screen using `react-navigation.` React-Navigation provides us a `navigation` prop that allows for pushing and popping screens.

```js
// screens/SelectPhotoScreen.js

import { Constants, ImagePicker, Permissions } from "expo";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import getPermission from "../utils/getPermission";

const options = {
  allowsEditing: true,
};

export default class SelectPhotoScreen extends Component {
  state = {};

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate("NewPost", { image: result.uri });
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate("NewPost", { image: result.uri });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._selectPhoto} style={styles.text}>
          Select Photo
        </Text>
        <Text onPress={this._takePhoto} style={styles.text}>
          Take Photo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
```

All we need now is a photo description. Provide a TextInput for … text input, using the `onChangeText` callback we can update the navigation state. The navigation state needs to know the description so it can post it to Firebase when the right header button is pressed.

**Header Buttons
**To make these as simple as possibly we will use the cool `react-navigation-header-buttons` library. Inside the button’s `onPress` method we will send data to the shared instance of `Fire` and pop the navigation stack to go back to the beginning.

```js
// screens/NewPostScreen.js

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TextInput, View } from "react-native";
import HeaderButtons from "react-navigation-header-buttons";

import Fire from "../Fire";

export default class NewPostScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: "New Post",
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
        <HeaderButtons.Item
          title="Share"
          onPress={() => {
            const text = navigation.getParam("text");
            const image = navigation.getParam("image");
            if (text && image) {
              navigation.goBack();
              Fire.shared.post({ text: text.trim(), image });
            } else {
              alert("Need valid description");
            }
          }}
        />
      </HeaderButtons>
    ),
  });

  state = { text: "" };

  render() {
    const { image } = this.props.navigation.state.params;
    return (
      <View style={{ padding: 10, flexDirection: "row" }}>
        <Image
          source={{ uri: image }}
          style={{ resizeMode: "contain", aspectRatio: 1, width: 72 }}
        />
        <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Add a neat description..."
          onChangeText={(text) => {
            this.setState({ text });
            this.props.navigation.setParams({ text });
          }}
        />
      </View>
    );
  }
}
```

## Just like Crystal Skull…

This post has a disappointing ending. 😜😘

I really just wanted to share some of these database paradigms that typically get overlooked. Stuff like pagination, shrinking images, and uploading images with Blob API.

We didn’t cover any of the components as they’re all purely aesthetic 😅: [https://github.com/EvanBacon/firebase-instagram/blob/%40evanbacon/tutorial/components](https://github.com/EvanBacon/firebase-instagram/blob/%40evanbacon/tutorial/components/Item.js)
[**Evan Bacon 🥓 (@Baconbrix) | Twitter**
*The latest Tweets from Evan Bacon 🥓 (@Baconbrix). 20💙Building dope apps for @expo🔥 Lego master builder😱Son of…*twitter.com](https://twitter.com/baconbrix)
[**EvanBacon/firebase-instagram**
*firebase-instagram - Instagram clone with Firebase Cloud Firestore, Expo, and React Native*github.com](https://github.com/EvanBacon/firebase-instagram/tree/%40evanbacon/tutorial)
