import React from "react";
import { Icon, IconName } from "./icon";

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
export function TabBarIcon({
  focused,
  ...props
}: {
  name: IconName;
  focused?: boolean;
  color: string;
  style?: any;
}) {
  let resolvedName: any = props.name;
  if (!focused) {
    resolvedName = props.name + "-outline";
  }

  return (
    <Icon
      style={[{ width: 30, height: 35, marginBottom: -3 }, props.style]}
      {...props}
      name={resolvedName}
      width={30}
      height={35}
      fill={props.color}
    />
  );
}

export function makeIcon(name: IconName) {
  return (props: { focused?: boolean; color: string }) => (
    <TabBarIcon name={name} {...props} />
  );
}
