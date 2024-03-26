import { useEffect, useMemo, useRef, useState } from "react";
import getImages from "../apis/getImages";
import batchImagesPost from "../apis/batchImages";
import { ImageType } from "../types/image.types";
import { toast } from "react-toastify";

const notify = (text: string) => {
  toast(text, {
    pauseOnHover: false,
  });
};

const useImages = () => {
  const batchImagesRef = useRef<{
    deletedImageIds: string[];
    createdImages: {
      id: string;
      url: string;
      title: string;
    }[];
    updatedImages: {
      id: string;
      isFavourite: boolean;
      title: string;
    }[];
  }>({
    deletedImageIds: [],
    createdImages: [],
    updatedImages: [],
  });

  const [images, setImages] = useState<ImageType[]>([]);

  const imagesIdsToIndexMap = useMemo(() => {
    const map = new Map<string, number>();

    images.forEach(({ id }, i) => {
      map.set(id, i);
    });

    return map;
  }, [images]);

  const imagesRef = useRef(images);
  const imagesIdsToIndexMapRef = useRef(imagesIdsToIndexMap);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);
  useEffect(() => {
    imagesIdsToIndexMapRef.current = imagesIdsToIndexMap;
  }, [imagesIdsToIndexMap]);

  const getAndSetImages = async () => {
    const { images } = await getImages();

    setImages(images);
  };

  const createImage = ({
    id,
    title,
    url,
  }: {
    id: string;
    url: string;
    title: string;
  }) => {
    setImages((s) => [...s, { url, id, title, isFavourite: false }]);

    batchImagesRef.current.createdImages.push({ id, title, url });
  };

  const updateImage = ({
    id,
    title,
    isFavourite,
  }: {
    id: string;
    title?: string;
    isFavourite?: boolean;
  }) => {
    const index = imagesIdsToIndexMapRef.current.get(id);

    if (typeof index === "number") {
      const image = imagesRef.current[index];

      if (typeof title === "string") {
        image.title = title;
      }

      if (typeof isFavourite === "boolean") {
        image.isFavourite = isFavourite;
      }

      setImages((s) => {
        s[index] = image;

        return [...s];
      });

      const batchUpdateImageIndex =
        batchImagesRef.current.updatedImages.findIndex(
          ({ id: _id }) => id === _id
        );

      if (batchUpdateImageIndex !== -1) {
        batchImagesRef.current.updatedImages[batchUpdateImageIndex] = image;
      } else {
        batchImagesRef.current.updatedImages.push(image);
      }
    }
  };

  const deleteImage = ({ id }: { id: string }) => {
    setImages((s) => {
      const index = s.findIndex(({ id: _id }) => id === _id);

      if (index !== -1) {
        s.splice(index, 1);
      }

      return [...s];
    });

    batchImagesRef.current.deletedImageIds.push(id);
  };

  const updateBatchImages = async () => {
    const batchImages = batchImagesRef.current;

    batchImagesRef.current = {
      deletedImageIds: [],
      createdImages: [],
      updatedImages: [],
    };

    if (
      batchImages.deletedImageIds.length ||
      batchImages.createdImages.length ||
      batchImages.updatedImages.length
    ) {
      notify("Syncing current state!");

      await batchImagesPost({
        deletedImageIds: batchImages.deletedImageIds,
        createdImages: batchImages.createdImages,
        updatedImages: batchImages.updatedImages,
      });
    } else {
      //
      notify("Not syncing current state, as no change found!");
    }
  };

  useEffect(() => {
    getAndSetImages();

    const interval = setInterval(() => {
      updateBatchImages();
    }, 30_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { images, createImage, updateImage, deleteImage };
};

export default useImages;
