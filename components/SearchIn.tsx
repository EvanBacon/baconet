import * as Linking from "expo-linking";

export function SearchIn() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: Linking.createURL("/"),
        potentialAction: {
          "@type": "SearchAction",
          target: Linking.createURL("/search", {
            queryParams: {
              q: "{search_term_string}",
            },
          }),
          "query-input": "required name=search_term_string",
        },
      })}
    </script>
  );
}
