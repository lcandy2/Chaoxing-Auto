export type CurrentPage = "list" | "detail" | null;

export type CurrentVersion = "new" | "legacy" | null;

export type CurrentStatus =
  | "idle"
  | "triggered"
  | "running"
  | "failed"
  | "success"
  | null;

export type CurrentTab = "status" | "settings" | "about";

export interface Reply {
  author?: string;
  content?: string;
}

export interface TopicDetail {
  title?: string;
  content?: string;
  replies?: Reply[];
}

export interface TopicList {
  title?: string;
  author?: string;
  replyCount?: string;
  url?: string;
}
