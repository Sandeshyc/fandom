export interface MovieInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailPotrait: string;
  videoUrl: string;
  duration: string;
  genre: Array<String>;
  publishSchedule?: string;
}
