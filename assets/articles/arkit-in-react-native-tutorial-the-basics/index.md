
# ARKit in React Native Tutorial&#58; The Basics

## By now you’ve probably seen some of the crazy things people have been making with ARKit. If you want to make AR stuff, but don’t own a Mac (or don’t care for Swift/Xcode/Objective-C), you’ve come to the right place!

### **We’re going to make a super simple React Native app that renders a cube in 3D space, show the camera feed, and keep the cube in place as we move our device around it**.

You can jump directly into source code for this project using this Snack:
SyntaxError: Unexpected token w in JSON at position 10

### A quick overview of the elements we’ll cover:

* The React Native GLView 🔥

* Creating a WebGL Renderer ∛

* Three.js Scenes 🌁

* 3D Cameras 🎥

* Camera Stream as Texture 🤳

## Ingredients

Here’s what you need to make a tasty AR snack:

* A computer with internet access

* An iOS device that sports the A9 chip (iPhone 6S and up; iPads from 2017+) and is running iOS 11+ (if you have an iPhone, it’s probably good enough).

* Android is not currently supported. (But actively being worked on) 😅

* You must use a physical device. 📱

## Creating the project

If you’re familiar with accessing the Turbo Tax+ website, then you’ll be immediately comfortable setting up this project.

* **Step 1:** [Go to snack.expo.io](https://snack.expo.io/)

That’s about it!

## Building a 3D scene

First, we need to build a simple 3D application, then later we can add AR. To do this we’ll use three.js, the most popular and intuitive 3D rendering library ever! To get things working right in Expo, we’ll use a library called expo-three, which has all the things we need to make 3D and AR simple!

At the top of your Snack, add three.js and expo-three, and expo-graphics:

```
import ExpoTHREE, { THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
```


Notice that we import Three.js from expo-three; this is to make sure that we use the same instance of **THREE** globally throughout our project.

Now replace the render function with this:

```
render() {
    return (
      <GraphicsView
        style={{ flex: 1 }}
      />
    );
  }
```


If we go ahead and run it, you should see this:

![Wait until tutorial #4…](./images/1NDSwqsXqYxMKeYB-uAJKBg.png)*Wait until tutorial #4…*

Just kidding! You should just see white or black. This view will create a WebGL context that we can use to make 3D stuff. When the context is created, it’ll call `onContextCreate`, which is where we can capture it.

```
render() {
    return (
      <GraphicsView
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
      />
    );
  }

onContextCreate = async ({gl, scale: pixelRatio, width, height}) => {
 // Insert 3D universe
}
```


To draw things to the screen, we need a 3D WebGL renderer. The renderer is responsible for displaying your digital wonderland:

```
onContextCreate = async ({gl, scale: pixelRatio, width, height}) => {
  // Create a 3D renderer
  this.renderer = new ExpoTHREE.Renderer({
    gl,
    pixelRatio,
    width,
    height,
  });
}
```


`ExpoTHREE.Renderer` extends `THREE.WebGLRenderer` and does a little magic (DOM shimming) to get things going in React Native. ([Still curious? Check out the source](https://github.com/expo/expo-three/blob/a38dbc9ef411b7babebf13fe7e0665278890d0b5/lib/Renderer.js#L3-L23).)

If you run it, you may see a bunch of warnings; use this to convert them to logs:

```
componentDidMount() {
  // Turn off extra warnings
  THREE.suppressExpoWarnings(true)
  ThreeAR.suppressWarnings()
}
```


After we build the renderer, let’s add a basic `THREE.Scene()`. AScene is the root node that we’ll use to add our lights, objects, and camera(s).

```
// We will add all of our meshes to this scene.
this.scene = new THREE.Scene();
// A generic camera
this.camera = new THREE.PerspectiveCamera(
  75, width / height, 0.1, 1000);
```


Now we should add a cube to the scene! To do this we need a Mesh. (Meshes are composed from a Geometry and a Material.)

```
// Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
// Simple color material
const material = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
});
    
// Combine our geometry and material
this.cube = new THREE.Mesh(geometry, material);
// Place the box 0.4 meters in front of us.
this.cube.position.z = -0.4
// Add the cube to the scene
this.scene.add(this.cube);
```


As you can see from the comments, every single unit is equal to 1 meter (39.3701 inches for my fellow American readers (Mom)). This means our cube is 3.9 inches.

We created a material that is just a single color: #ff00ff (purple). Then we added everything together in the cube mesh, placed the cube 0.4 meters in front of us, and added the cube to the scene.

We also need to add light to the scene so we can see colors:

```
this.scene.add(new THREE.AmbientLight(0xffffff));
```


Finally, we need a function that’s called every single frame. We call this the render loop. First we’ll add it to the component, then we’ll include it as the onRender prop in the GraphicsView.

```
// In the render method
<GraphicsView
  style={{ flex: 1 }}
  onContextCreate={this.onContextCreate}
  onRender={this.onRender}
  />
...
// In the outer scope after `onContextCreate`
onRender = () => {
  this.renderer.render(this.scene, this.camera);
};
```


When you run it, you should see this:

![](./images/1QLOZapDafTxikAs2b0nVGg.png)

## Augmented Reality

Now let’s add AR! Go to the `GraphicsView` and add the prop `isArEnabled`. This will initialize an AR Session natively. With this, we can make our cyber-camera match the orientation of our iOS device.

```
// In the render method
<GraphicsView
  style={{ flex: 1 }}
  onContextCreate={this.onContextCreate}
  onRender={this.onRender}
  isArEnabled
  arTrackingConfiguration={AR.TrackingConfigurations.World}
  // Bonus: debug props
  isArRunningStateEnabled
  isArCameraStateEnabled
  />
```


At the top of our `onContextCreate` function add this:

```
AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
```


This means that ARKit will find horizontal data; if your device is running 11.3 (ARKit 1.5) then you can use `.Vertical` as well!

The scene has a member called `background`— this can be a color, skybox, null, or texture. We’ll use a stream from the camera.

```
this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
```


If you run the project, you should see something like this:

![All we have here is a purple square that doesn’t move.](./images/1WOseNV6RfWiO5HDQVrB21Q.png)*All we have here is a purple square that doesn’t move.*

Notice that the cube doesn’t move; we actually want to move the camera around the scene to match our device orientation.

Replace the camera with a `ThreeAR.Camera`. (This just extends the `PerspectiveCamera` and has a few internal functions that allow us to do largely nothing. In fact, it’s so easy I have to ramble to fill in this tutorial.)

```
this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
```


Now finally, we have AR! 📱👏

![](./images/1gETWSWKxVMTml0If7m9egA.gif)

I hope you had as much fun as I did! Next time, we’ll dive into cool stuff like sticking things to surfaces, realistic lighting, shadows, visualizers, audio!

## Links

Hey there, hope you jumped to the bottom. Here’s what we covered + screen resize handling: [https://snack.expo.io/@bacon/ar-tutorial-1](https://snack.expo.io/@bacon/ar-tutorial-1)

Follow/yell at me on Twitter 🦄:
[**Evan Bacon 🥓 (@Baconbrix) | Twitter**
*The latest Tweets from Evan Bacon 🥓 (@Baconbrix). 20💙Building dope apps for @expo🔥 Lego master builder😱Son of…*twitter.com](https://twitter.com/Baconbrix)

And show people the stuff you made on [our forums](http://forums.expo.io) ⭐️💙 so I can throw you some stars 😉!