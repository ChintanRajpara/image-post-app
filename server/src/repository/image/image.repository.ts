// import { toObjectId, toBase64, fromBase64 } from "../../common/mongoose";
// import { fromGlobalId } from "graphql-relay";

import https from "https";
import fs from "fs";
import { createUID } from "../../utils/createUID.js";
import env from "../../utils/env.js";

type ImageType = {
  id: string;
  title: string;
  fileName: string;
  isFavourite: boolean;
  url: string;
};

class ImageRepository {
  private static instance: ImageRepository;
  private images: ImageType[];

  async saveFileFromUrl({ url }: { url: string }): Promise<string> {
    const fileId = createUID();

    const fileName = fileId;

    const file = fs.createWriteStream(`./public/${fileName}`);

    await new Promise((resolve) => {
      https.get(url, function (response) {
        response.pipe(file);

        file.on("finish", () => {
          file.close();

          resolve(undefined);
        });
      });
    });

    return fileName;
  }

  async loadImages(): Promise<void> {
    this.images = [];

    const dummyImages = [
      {
        title: "Nature #1",
        url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: false,
      },
      {
        title: "Nature #2",
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: true,
      },
      {
        title: "Nature #3",
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=6074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: false,
      },
      {
        title: "Nature #4",
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=5616&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavourite: true,
      },
    ];

    try {
      fs.rmSync("./public", { recursive: true });
    } catch (error) {
      //
    }

    try {
      fs.mkdirSync("./public");
    } catch (error) {
      //
    }

    for (let index = 0; index < dummyImages.length; index++) {
      const image = dummyImages[index];
      const id = createUID();

      const fileName = await this.saveFileFromUrl({ url: image.url });

      this.images.push({ ...image, id, fileName });
    }
  }

  constructor() {
    this.loadImages();
  }

  getImages(): { images: ImageType[] } {
    return {
      images: this.images,
    };
  }

  getImage({ id }: { id: string }): ImageType | null {
    return this.images.find(({ id: _id }) => id === _id);
  }

  async createImage({
    url,
    title,
    id,
  }: {
    url: string;
    title: string;
    id?: string;
  }): Promise<{ success: boolean; image: ImageType; message: string }> {
    const fileName = await this.saveFileFromUrl({ url });

    const image = {
      fileName,
      title,
      id: id || createUID(),
      isFavourite: false,
      url: `${env.SERVER_HOST}/${fileName}`,
    };

    this.images.push(image);

    return {
      success: true,
      image: image,
      message: "Image posted successfully!",
    };
  }

  updateImage({
    id,
    title,
    isFavourite,
  }: {
    id: string;
    title?: string;
    isFavourite?: boolean;
  }): { success: boolean; image: ImageType; message: string } {
    const imageIndex = this.images.findIndex(({ id: _id }) => _id === id);

    if (imageIndex === -1) {
      return { success: false, image: null, message: "Image not found!" };
    }

    const image = this.images[imageIndex];

    if (title) {
      image.title = title;
    }

    if (typeof isFavourite === "boolean") {
      image.isFavourite = isFavourite;
    }

    this.images[imageIndex] = image;

    return {
      success: true,
      image: image,
      message: "",
    };
  }

  deleteImage({ id }: { id: string }): {
    success: boolean;
    image: ImageType;
    message: string;
  } {
    const imageIndex = this.images.findIndex(({ id: _id }) => _id === id);

    if (imageIndex === -1) {
      return { success: false, image: null, message: "Image not found!" };
    }

    const image = this.images[imageIndex];

    this.images.splice(imageIndex, 1);

    return {
      success: true,
      image: image,
      message: "Image deleted successfully!",
    };
  }

  async batchImages({
    deletedImageIds,
    createdImages,
    updatedImages,
  }: {
    deletedImageIds: string[];
    createdImages: { id: string; url: string; title: string }[];
    updatedImages: { id: string; isFavourite?: boolean; title?: string }[];
  }): Promise<void> {
    for (let index = 0; index < createdImages.length; index++) {
      const createdImage = createdImages[index];

      const { id, title, url } = createdImage;

      await this.createImage({ title, url, id });
    }

    for (let index = 0; index < deletedImageIds.length; index++) {
      const id = deletedImageIds[index];

      this.deleteImage({ id });
    }

    for (let index = 0; index < updatedImages.length; index++) {
      const image = updatedImages[index];

      this.updateImage(image);
    }
  }

  public static getInstance(): ImageRepository {
    if (!ImageRepository.instance) {
      ImageRepository.instance = new ImageRepository();
    }
    return ImageRepository.instance;
  }
}

ImageRepository.getInstance();

export { ImageRepository };
