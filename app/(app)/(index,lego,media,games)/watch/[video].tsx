import { Stack, useSearchParams } from "expo-router";
import { data } from "../../../../data/media";

export default function Page() {
  const { video } = useSearchParams();

  const item = data.find((item) => item.slug === video);

  if (!item) {
    return (
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Not found: {video}</h2>
      </div>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: item.title,
        }}
      />
      <div style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}>
        <h2>{item.title}</h2>
        <h4>{item.subtitle}</h4>
      </div>
    </>
  );
}
