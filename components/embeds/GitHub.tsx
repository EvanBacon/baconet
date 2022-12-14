import { Text } from "@bacons/react-views";

export function Gist({}: { url: string }) {
  return <Text>Gist Embed not implemented</Text>;
}
export function GitHubRepo({ url }: { url: string }) {
  return <Text>GitHub repo Embed not implemented: {url}</Text>;
}
export function GitHubProfile({ url }: { url: string }) {
  return <Text>GitHub profile Embed not implemented: {url}</Text>;
}
