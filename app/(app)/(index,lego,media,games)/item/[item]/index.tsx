import { Link, useSearchParams } from "expo-router";
import React from "react";
import { Image, Platform, ScrollView } from "react-native";

import {
  Lego,
  LegoProject,
  Podcasts,
  Project,
  Projects,
} from "../../../../../components/data";
import { getItem } from "../../../../../components/fetchItem";
import { ScreenScroller } from "../../../../../components/ScreenScroller";
import { useScrollProps } from "@bacons/expo-router-top-tabs";

function getRelated(index: number) {
  return [
    Projects[index % Projects.length],
    Lego[index % Lego.length],
    Podcasts[index % Podcasts.length],
  ];
}

export default function Page() {
  const route = useSearchParams();
  const item = getItem(route.item);
  const props = useScrollProps();

  const index = parseInt(route.item.split("-")[1]);
  const related = getRelated(index + 1).concat(getRelated(index + 2));
  return (
    <ScreenScroller {...props}>
      {/* <ProjectCard key={item.title} {...item} /> */}

      {/* <Text>{JSON.stringify({ item }, null, 2)}</Text> */}

      <div style={{ paddingHorizontal: 12 }}>
        <InfoSection item={item} />
        <AwardsSection item={item} />
        <RecommendedSection items={related} />
      </div>
    </ScreenScroller>
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
    <div
      style={{ flexDirection: "row", paddingVertical: 8, alignItems: "center" }}
    >
      <div>
        <h1 style={{ fontWeight: "bold", fontSize: 16 }}>{title}</h1>
        {subtitle && <h2 style={{ fontSize: 14 }}>{subtitle}</h2>}
      </div>
      <div
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
      <span style={{ color: "#6e7072" }}>{children}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ paddingVertical: 12 }}>
      <h3 style={{ fontWeight: "bold", fontSize: 24, paddingBottom: 12 }}>
        {title}
      </h3>
      {children}
    </div>
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
  return (
    <Link
      href={{
        pathname: "./[item]",
        params: { item: project.slug },
      }}
    >
      <div style={{ paddingRight: 12 }}>
        <div style={{ width: 192, maxWidth: 192, paddingHorizontal: 1 }}>
          <Image
            style={{ height: 150, width: 190, resizeMode: "cover" }}
            source={project.image}
          />
          <div style={{ paddingTop: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: "bold" }}>
              {project.title}
            </h3>
            <span style={{ color: "#6e7072" }}>{project.description}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { ErrorBoundary } from "expo-router";
