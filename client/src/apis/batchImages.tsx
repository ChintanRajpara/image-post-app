import { API_SERVER_BASE_URL } from "../utils/constants";

const batchImages = async ({
  createdImages,
  deletedImageIds,
  updatedImages,
}: {
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
}) => {
  try {
    await fetch(`${API_SERVER_BASE_URL}/batch-images`, {
      method: "POST",
      body: JSON.stringify({ createdImages, deletedImageIds, updatedImages }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export default batchImages;
