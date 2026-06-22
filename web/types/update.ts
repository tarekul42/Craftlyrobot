export type UpdateType =
  | "shipped"
  | "progress"
  | "milestone"
  | "announcement"
  | "community"
  | "behind-the-scenes";

export interface UpdateLink {
  label: string;
  href: string;
}

export interface Update {
  id: string;
  type: UpdateType;
  title: string;
  summary: string;
  date: string;
  author?: string;
  link?: UpdateLink;
  tags?: string[];
}
