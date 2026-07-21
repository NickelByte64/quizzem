export const MediaTypeEnum = {
  NONE: 'NONE',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
} as const;

export type MediaType = (typeof MediaTypeEnum)[keyof typeof MediaTypeEnum];
