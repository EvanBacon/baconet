import { Link, Stack } from "expo-router";
import React from "react";
import { Image, Platform, ScrollView, Text, View } from "react-native";

import {
  Lego,
  LegoProject,
  Podcasts,
  Project,
  Projects,
} from "../../../../components/data";
import { ScreenScroller } from "../../../../components/ScreenScroller";

function getItem(id: string): Project | null {
  const [type, index] = id.split("-");

  switch (type) {
    case "game":
      return Projects[parseInt(index)];
    case "lego":
      return Lego[parseInt(index)];
    case "media":
      return Podcasts[parseInt(index)];
    // case "news":
    //   return News[parseInt(index)];
  }
  return null;
}

function getRelated(index: number) {
  return [
    Projects[index % Projects.length],
    Lego[index % Lego.length],
    Podcasts[index % Podcasts.length],
  ];
}

export default function Page({ route }) {
  const item = getItem(route.params?.item);
  if (!item) {
    return <Text>Nothing here: {route.params?.id}</Text>;
  }
  const index = parseInt(route.params?.item.split("-")[1]);
  const related = getRelated(index + 1).concat(getRelated(index + 2));
  return (
    <>
      <Stack.Screen
        options={{
          title: item.title,
        }}
      />
      <ScreenScroller>
        <Image source={item.image} style={{ width: "100%", maxHeight: 300 }} />

        {/* <ProjectCard key={item.title} {...item} /> */}

        {/* <Text>{JSON.stringify({ item }, null, 2)}</Text> */}

        <View style={{ paddingHorizontal: 12 }}>
          <RecommendedSection items={related} />

          <InfoSection item={item} />
          <AwardsSection item={item} />
        </View>
      </ScreenScroller>
    </>
  );
}

function isLegoProject(item: Project | LegoProject): item is LegoProject {
  return (item as LegoProject).year !== undefined;
}

function InfoSection({ item }: { item: Project | LegoProject }) {
  if (isLegoProject(item)) {
    return (
      <Section title="Info">
        <InfoListItem title="Completed">{item.year}</InfoListItem>

        <InfoListItem title="Brick Count">{item.bricks}</InfoListItem>

        <InfoListItem title="Height">{item.height}</InfoListItem>

        <InfoListItem title="Weight">{item.weight}</InfoListItem>
      </Section>
    );
  }
  return null;
}

function AwardsSection({ item }: { item: Project | LegoProject }) {
  if (isLegoProject(item) && item.awards?.length > 0) {
    return (
      <Section title="Awards">
        {item.awards.map((award, index) => (
          <InfoListItem
            key={index}
            title={award.title}
            subtitle={String(award.year)}
          >
            {award.result === "won" ? "Won" : "Nominated"}
          </InfoListItem>
        ))}
      </Section>
    );
  }
  return null;
}

function InfoListItem({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  if (children == null) return null;
  return (
    <View
      style={{ flexDirection: "row", paddingVertical: 8, alignItems: "center" }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
        {subtitle && <Text style={{ fontSize: 14 }}>{subtitle}</Text>}
      </View>
      <View
        style={{
          marginHorizontal: 12,
          flex: 1,
          borderTopWidth: 1,
          borderStyle: Platform.select({
            web: "dotted",
            default: "solid",
          }),
          borderColor: "#6e707255",
        }}
      />
      <Text style={{ color: "#6e7072" }}>{children}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={{ paddingVertical: 12 }}>
      <Text style={{ fontWeight: "bold", fontSize: 24, paddingBottom: 12 }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function RecommendedSection({ items }: { items: Project[] }) {
  return (
    <Section title="Recommended">
      <ScrollView horizontal>
        {items.map((item, index) => (
          <ProjectPreview key={index} {...item} />
        ))}
      </ScrollView>
    </Section>
  );
}

function ProjectPreview(project: Project) {
  const url = project.actions[0].url;
  return (
    <Link
      href={{
        pathname: "./[item]",
        params: { item: url.split("/").pop() },
      }}
    >
      <View style={{ paddingRight: 12 }}>
        <View style={{ width: 192, maxWidth: 192, paddingHorizontal: 1 }}>
          <Image
            style={{ height: 150, width: 190, resizeMode: "cover" }}
            source={project.image}
          />
          <View style={{ paddingTop: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {project.title}
            </Text>
            <Text style={{ color: "#6e7072" }}>{project.description}</Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

export { ErrorBoundary } from "expo-router";
