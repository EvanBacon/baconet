
# Licenses&#58; The Best Part of Your App

## Automation + Style

### TL;DR: check out [this Snack](https://snack.expo.io/@bacon/licenses) ⭐️ to make licenses look cool with minimal effort.

## I’m back again with another thing that will make your app cooler.

You might know about the “licenses” page that you should probably add to your app for legal reasons…or you might not because you’re busy lol

![What we’ll be making, and hiding in our settings page ❤ love you [Mr. Doob](https://mrdoob.com/)](./images/1-oU8Em2jRJpKSzESiEVXMA.png)*What we’ll be making, and hiding in our settings page ❤ love you [Mr. Doob](https://mrdoob.com/)*

To be honest, it never really crossed my mind to go about crediting cyber-framework people because the examples from major companies are overwhelming, and not really supporting the library creators 🦄🙃

![I’m sure [Mattt](https://github.com/mattt) (NSHipster) appreciates the non-linked shoutout, but maybe it could be better. 😏[https://mat.tt/](https://mat.tt/)](./images/1QmhCcaEu7n2K8oevSyG94g.png)*I’m sure [Mattt](https://github.com/mattt) (NSHipster) appreciates the non-linked shoutout, but maybe it could be better. 😏[https://mat.tt/](https://mat.tt/)*

## So why even do it?

Turns out you *need* to indicate **Apache 2.0 Licenses**. 🔥 But let’s credit everyone, because they’re pretty cool people!

## Also…

It’s really easy to do this in a React Native app because all the app’s library info is in the package.json / node_modules folder! Which is pretty cool, for ease of development. But we can also…well, you already know what we can do with it — make a licenses page 😉.

## How to do it

Now that I’ve made it really easy to sue me, let’s make licenses pages! This should take about two minutes.

1. I use [this library](https://www.npmjs.com/package/npm-license-crawler) to index my package.json

1. Install it globally in a terminal: `npm i npm-license-crawler -g`

### **There are two main styles of licenses:**

**A. Overwhelmingly long** and thorough ones that aren’t really all that helpful as there will be about a hundred libs (but you do you). Run this in your projects root directory:

```
npm-license-crawler -dependencies -json licenses.json
```


**B. A concise and clean** list of direct packages that you use in your app: (I like this one because I recognize all the libraries in the list). In your projects root directory:

```
npm-license-crawler -onlyDirectDependencies -json licenses.json
```


You can also filter out licenses that you don’t need to legally display, if that’s what you’re into 🤷‍.

### Time to go crazy!

Now that we have this cool json, we can format and style however we want, I like [this treatment](https://snack.expo.io/@bacon/licenses) (it’s the one from the picture at the top of this… “tutorial”).

Notice how we regex out the user’s Github name and get their profile picture; I like this because it makes a huge difference for personalization.

We also filter out the “[framework] by [user]” if the framework name is the same as the user’s (e.g Firebase, Expo). Just looks a little smarter.

We sort by name so that related libraries show up next to each other. This is nice because all the Facebook, Expo, etc., logos are grouped together.

Also, if you tap the image, it’ll take you to the user. If you could think of a more personalized way to do this, say with a Twitter handle, definitely share how in the comments because that’s cool.

Finally, imagine if **you** are an open-source dev and get to see your face in something you didn’t directly work on, that’s pretty awesome!

## Links

* The Snack: [https://snack.expo.io/@bacon/licenses](https://snack.expo.io/@bacon/licenses)

* You can keep up with me on [Twitter](https://twitter.com/baconbrix) or [Github](https://github.com/evanbacon)

* Share your cool apps, source, or questions on our [forums](http://forums.expo.io) 👥

* Subscribe to [Exposition](https://blog.expo.io/), or [follow us on Twitter](https://twitter.com/expo) for the most up-to-date news 📰

* Check out [examples on Github](https://github.com/expo/examples) ⭐️

**50 claps** because it justifies the 75 company hours I borrowed to make this article.