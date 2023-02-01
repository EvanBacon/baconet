import { Head } from "@bacons/head";
import { Image } from "react-native";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Evan Bacon</title>
        <meta name="description" content="About Evan Bacon" />
        <meta
          property="og:image"
          content="https://icogen.vercel.app/api/icon?icon=🥓"
        />
        <meta
          name="keywords"
          content="evan bacon,expo,javascript,typescript,ios,android,native,react native,react,learn"
        />
      </Head>
      <div style={{ flex: 1, padding: 16 }}>
        <Image
          source={require("../../../assets/brand/evanbacon-2022.jpg")}
          resizeMode="cover"
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <h1>Evan Bacon</h1>
        <p>
          I'm a software developer and artist. I started working on Expo in 2017
          with the goal to make mobile content easy to create, share, and
          discover. Previously, I worked as the sole design technologist on the
          SiriusXM (360L) in-car and mobile experiences. Before software
          development, I was an award-winning Lego artist, specializing in
          life-sized sculptures.
        </p>
      </div>
    </>
  );
}
