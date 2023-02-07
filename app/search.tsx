import { useSearchParams } from "expo-router";

export default function Page() {
  const { q } = useSearchParams();
  return (
    <div style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <h1>Continue Search...</h1>
      <p>Query: {q}</p>
    </div>
  );
}
