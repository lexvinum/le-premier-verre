export type AssistantErrorCode =
  | "INVALID_REQUEST"
  | "EMPTY_MESSAGE"
  | "SEARCH_FAILED"
  | "GENERATION_FAILED";

export type AssistantErrorResponse = {
  error: string;
  code: AssistantErrorCode;
};