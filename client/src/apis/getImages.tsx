import { ImageType } from "../types/image.types";
import { API_SERVER_BASE_URL } from "../utils/constants";

const getImages = async (): Promise<{ images: ImageType[] }> => {
  try {
    const res = await fetch(`${API_SERVER_BASE_URL}/images`);

    const json = await res.json();

    return { images: (json?.data?.images as unknown as ImageType[]) || [] };
  } catch (error) {
    return { images: [] };
  }
};

export default getImages;
