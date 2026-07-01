import type { SearchType } from "@/types/search";

export type AssistantErrorCode =
  | "INVALID_REQUEST"
  | "EMPTY_MESSAGE"
  | "SEARCH_FAILED"
  | "GENERATION_FAILED";

export type AssistantErrorResponse = {
  error: string;
  code: AssistantErrorCode;
};

export type AssistantSource = {
  id: string;
  type: SearchType;
  typeLabel: string;
  title: string;
  href: string;
};

export type AssistantContext = {
  query: string;
  sources: AssistantSource[];
  contextText: string;
};
