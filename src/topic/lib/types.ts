export type CurrentPage = "list" | "detail" | false;

export interface Reply {
  author?: string;
  content?: string;
}

export interface TopicDetail {
  title?: string;
  content?: string;
  replies?: Reply[];
}
