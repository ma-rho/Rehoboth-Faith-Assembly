export type Sermon = {
  id: string;
  title: string;
  preachedDate: string; // ISO 8601 format
  youtubeVideoId: string;
  speaker: string;
};

export type Event = {
  id: string;
  title: string;
  date: string; // ISO 8601 format
  description: string;
  location: string;
  imageUrl: string;
  imageHint: string;
};

export type Pastor = {
  name: string;
  title: string;
  bio: string;
};
