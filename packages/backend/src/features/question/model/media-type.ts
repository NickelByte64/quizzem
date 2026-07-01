export const MediaTypeEnum = {
  NONE: 'NONE',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
};

export type MediaType = (typeof MediaTypeEnum)[keyof typeof MediaTypeEnum];
