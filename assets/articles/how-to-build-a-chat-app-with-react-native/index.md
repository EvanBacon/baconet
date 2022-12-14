
# How To Build A Chat App With React Native

## Expo + Firebase + React Native + Gifted Chat

Let’s create a basic chat application that works on every iOS and Android device. To do this we will use a framework called Expo!

Expo extends React Native and gives us all the tools we need to get moving quickly without having to use anything but javascript!

![Here it is!!](./images/1UzG__5fIBC6a5HwFLD0RXQ.png)*Here it is!!*
SyntaxError: Unexpected token w in JSON at position 10

## Requirements

Here is what you need before we can get started.

* Computer

* Ability to type

## Building the App

To make a chat app we will need a few things:

* A server to store all the messages

* Screen to get the users name

* Screen to send and receive messages

Let’s go at these 1-by-1 with Gifs to keep your attention.

### Setting up a Server

is a scary task, especially if you are pretty. We will use a service called Firebase, it’s free, it’s scalable, it’s easy, and it’s made by Google.

Go to the Firebase console and setup a new app: [https://console.firebase.google.com](https://console.firebase.google.com/u/0/)

![Add a project.](./images/1ZybNV8cT8UXeiuRcQ15myg.png)*Add a project.*

![Add some info](./images/1eVzz_lpXceEIqdgBvyg78A.png)*Add some info*

![](./images/1hsPWDdCfRY3lAKrK6NtqIA.png)

![Go to the auth tab and click “Set up sign-in method”](./images/1xwKDU4h307bVj5xoGnvZjw.png)*Go to the auth tab and click “Set up sign-in method”*

![Scroll down and click on “Anonymous”, we want to enable this](./images/1pdhzYQ7vFFRp3lTc71bzOQ.png)*Scroll down and click on “Anonymous”, we want to enable this*

![Enable and Save!](./images/1Y1YqDtYo5IU9hPmgVK9VkA.png)*Enable and Save!*

## Time to Code!

Open the starter snack: [https://snack.expo.io/@bacon/basic-chat-starter](https://snack.expo.io/@bacon/basic-chat-starter)

This will have the files for our two screens and our data provider.

![](./images/1yJacTbw9AhbPBdskKSrkJw.png)

To get this connected let’s add react-navigation and connect the screens. We want to build a Stack Navigator that will allow us to push the Chat screen on top of the Main screen. Then we will export the navigator as the root component.

**App.js**

```
// Import the screens
import Main from './components/Main';
import Chat from './components/Chat';
// Import React Navigation
import { createStackNavigator } from 'react-navigation'

// Create the navigator
const navigator = createStackNavigator({
  Main: { screen: Main },
  Chat: { screen: Chat },
});

// Export it as the root component
export default navigator
```


If we run this we will see a blank screen with a header bar. This is pretty cool but not really, let’s add a text field for our user’s name and then a button to go to the Chat screen.

**components/Main.js**

```
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class Main extends Component {
  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({});

export default Main;
```


When we open the `Main.js` we should see a basic component and the styles setup. First let’s add the Text Input.

**components/Main.js**

```
import {
  StyleSheet,
  TextInput, // 1. <- Add this 
  View,
} from 'react-native';

...

class Main extends React.Component {
  state = { name: '' } // 2. <- Add the component state

  render() {
    return (
      <View>
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          value={this.state.name}
        />
      </View>
    );
  }
}

...

const offset = 24;
const styles = StyleSheet.create({
  nameInput: { // 3. <- Add a style for the input
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
});
```


1. Import the `TextInput` component from React Native

1. Create a component `state` and give it a property called `name`, we will use this to update the and track the user input.

1. Inside the render method between the `View` tags we want to add a `TextInput` with a `placeHolder` value and then we set the `value` prop to be the same as our `state.name`

Now we need to update the state when the user types something. To do that we will observe the changes and save them to the component state.

```
// Inside the Main component...
onChangeText = name => this.setState({ name }); // 1.


// Inside the render() method...

<TextInput
  onChangeText={this.onChangeText} // <- Add this
  style={styles.nameInput}
  placeHolder="John Cena"
  value={this.state.name}
        />
```


1. Here we update the component state with a new string value.

If we run the app we should see our nifty `TextInput` let’s add a title and a button to go to the next screen

```
// 1.
import {
  StyleSheet,
  Text, // <- Add Text
  TextInput,
  TouchableOpacity, // <- Add TouchableOpacity
  View,
} from 'react-native';

...

render() {
    return (
      <View>

        // 2. Add the title
        <Text style={styles.title}>Enter your name:</Text> 
        <TextInput
          style={styles.nameInput}
          placeHolder="John Cena"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        // 3. Add a button

        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

...

const styles = StyleSheet.create({
  title: { // 4.
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: { // 5.
    marginLeft: offset,
    fontSize: offset,
  },
})
```


1. Add the new imports.

1. Create a `Text` element that tell’s our user what to do.

1. Build a Button by adding a Text and wrapping it in a TouchableOpacity. Then assign the onPress to this.onPress, we’ll create that in a second.

1. Make the title stile, add some margin and give it a nice large font

1. Create a style for the button text

Now let’s add the onPress that takes us to the Chat screen. In the Main component right before the `onChangeText` method, add this.

```
onPress = () => {
  // 1.
  this.props.navigation.navigate('Chat', { name: this.state.name });
}
```


1. We will navigate by using `this.props.navigation` which is provided at the screen level by our stack navigator. `navigation` has a method called `navigate` which will push a new screen, we will pass in the name of the screen we defined earlier in the `App.js` — *Chat *and then we will pass some props to that screen, specifically the `state.name` we created with the `TextInput`.

![This is what we should have](./images/1AlAKoCtaLttJuW_dMXBuuw.png)*This is what we should have*

## Chat Screen

That’s all we need to do in our Main.js, you can open the **Chat.js** and start adding some chat stuff!

**components/Chat.js**

```
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class Chat extends Component {
  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({});

export default Chat;
```


To get started make sure your Chat.js looks like this. Let’s setup the chat component.

```
import React from 'react';

// 1.
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends React.Component {

  // 2.
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  // 3.
  state = {
    messages: [],
  };
 
  render() {

    // 4.
    return (
      <GiftedChat
        messages={this.state.messages}
      />
    );
  }
}

export default Chat;
```


1. Import GiftedChat from `‘react-native-gifted-chat’` This is the component that we will use to do most of the heavy lifting.

1. `navigationOptions` is used to configure how the navigation components (Header) look and act. We are passing an object with a `title` property that will set the title to either the state.params.name or a default value of `Chat!`

1. Create the component state and give it a messages prop then assign it to an array.

1. Replace the View with the GiftedChat component and give it our state.messages to render.

## Database

This is a pretty good start, we need a way to get messages and determine which ones came from us. Now we will add a listener that gets called whenever a message is sent or received.

Let’s go to Fire.js to set this up!

**/Fire.js**

```
class Fire {}

Fire.shared = new Fire();
export default Fire;
```


We should just have a basic class with a shared instance setup, let’s setup a Firebase app.

```
// 1.
import firebase from 'firebase'; 

class Fire {
  constructor() {
    this.init();
  }

  // 2.
  init = () =>
    firebase.initializeApp({
      apiKey: 'AIzaSyDLgW8QG1qO8O5WZLC1U8WaqCr5-CvEVmo',
      authDomain: 'chatter-b85d7.firebaseapp.com',
      databaseURL: 'https://chatter-b85d7.firebaseio.com',
      projectId: 'chatter-b85d7',
      storageBucket: '',
      messagingSenderId: '861166145757',
    });
}
```


1. Import firebase, we will use this to access our database

1. Initialize our Firebase app using the keys we get in our app

![Here is an example of the creds](./images/1ETOHJEojfRBOUV9gMdH44Q.png)*Here is an example of the creds*

In order to write and read from our database we need to be logged in, to do this we will get our current authentication, if it doesn’t exist then we want to sign in anonymously.

```
class Fire {
  constructor() {
    this.init();

    // 1.
    this.observeAuth();
  }

  // 2.
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // 3.
  onAuthStateChanged = user => {
    if (!user) {
      try {
        // 4.
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };
}
```


1. After initializing, call our `observeAuth` function

1. we want to get our auth, if we were signed in before then this will return a user, if we weren’t then this will be null.

1. onAuthStateChanged gets called as soon as firebase finds our auth.

1. if we weren’t signed in then sign in anonymously, if this fails then we will pop an alert with an error message.

Now we need a way to subscribe to messages, after `onAuthStateChanged`

```
// 1.
get ref() {
  return firebase.database().ref('messages');
}

// 2.
on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

// 3.
parse = snapshot => {
}

// 4.
off() {
  this.ref.off();
}
```


1. Create a reference to a location in our database where the messages will be saved, in our case it’s `/messages`

1. Make a method with a callback prop that calls our messages ref and get’s the last 20 messages, then whenever a new message comes in we will get that as well. When we get a message we want to send it a function to parse.

1. Create the parse method, we will add more here later

1. Add a function to unsubscribe to the database

Ok now we can get messages, we need to format them correctly for GiftedChat, to do this we will reduce (change the shape) the snapshot (data returned from firebase) in the parse method.

```
parse = snapshot => {

  // 1.
  const { timestamp: numberStamp, text, user } = snapshot.val();
  const { key: _id } = snapshot;

  // 2.
  const timestamp = new Date(numberStamp);

  // 3.
  const message = {
    _id,
    timestamp,
    text,
    user,
  };
 return message;
};
```


1. Deconstruct the snapshot.val(), calling snapshot.val() will return the value or object associated with the snapshot

1. Let’s convert the timestamp that was saved, to a js Date.

1. Finally we will create an object that GiftedChat is familiar with, then return it, _id is the unique key for the message, text, user, and timestamp are exactly what you might think.

We now need a way to send messages

```
// 1.
get uid() {
  return (firebase.auth().currentUser || {}).uid;
}

// 2.
get timestamp() {
  return firebase.database.ServerValue.TIMESTAMP;
}

// 3.
send = messages => {
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];

    // 4.
    const message = {
      text,
      user,
      timestamp: this.timestamp,
    };
    this.append(message);
  }
};

// 5.
append = message => this.ref.push(message);
```


1. Create a helper for getting the user’s uid

1. Get the accurate timestamp for saving messages

1. Make a send function that accepts an array of messages, then loop through the messages

1. Create a shape that if good for firebase and save it to our server

1. The append function will save the message object with a unique ID

That’s it for the backend, now we can go back to the Chat.js screen and connect everything!

At the bottom of the component add subscribers and unsubscribers:

**components/Chat.js**

```
// 1.
componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
}

// 2.
componentWillUnmount() {
  Fire.shared.off();
}
```


1. When the component is added to the screen, we want to start looking for messages. Call the `Fire.shared.on` method and pass in a callback. We want our callback to get messages then add them to our current messages.

1. When the component leaves the screen we want to unsubscribe from the database.

Next we need a simple reference to our user so `GiftedChat` knows which side of the screen to put our chat bubbles on…

```
get user() {

  // Return our name and our UID for GiftedChat to parse
  return {
    name: this.props.navigation.state.params.name,
    _id: Fire.shared.uid,
  };
}
```


Finally we need to give `GiftedChat` a reference to our user and the `onSend` method from `Fire`

```
render() {
    return (
      <GiftedChat
        messages={this.state.messages}
**        onSend={Fire.shared.send}**
**        user={this.user}**
      />
    );
  }
```


And that’s it! Now when you run the build you should be able to join your group and start saving messages to the database!!!

![](./images/1OBT1wi1RfySRyMcO8snjNg.png)

Also your header should have text, my phone is on the bed behind me and I don’t want to get up and grab it, so enjoy these screenshots instead 💙😜

## Links

The full project: [https://snack.expo.io/@bacon/firebase-basic-chat](https://snack.expo.io/@bacon/firebase-basic-chat)

Actively avoid my twitter:
[**Evan Bacon 🥓 (@Baconbrix) | Twitter**
*The latest Tweets from Evan Bacon 🥓 (@Baconbrix). 20💙Building dope apps for @expo🔥 Lego master builder😱Son of…*twitter.com](https://twitter.com/Baconbrix)

And show people the stuff you made on [our forums](http://forums.expo.io)! ⭐️💙