import { Lego, Podcasts, Project, Projects } from "./data";

export function getItem(id: string): Project | null {
  if (!id) {
    throw new Error("Item is required");
  }
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
  //   return null;
  throw new Error("Item not found: " + id);
}
