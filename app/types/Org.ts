export interface Org {
  id: string | number;
  name: string;
  files?: {
    textPresent: string;
    video: string;
    photoPresent: string;
  };
}
