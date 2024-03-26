import { ImageType } from "./image.types";

export type AppContextType = {
  images: ImageType[];
  createImage: (t: { id: string; url: string; title: string }) => void;
  deleteImage: (t: { id: string }) => void;
  updateImage: (t: {
    id: string;
    title?: string;
    isFavourite?: boolean;
  }) => void;
};
