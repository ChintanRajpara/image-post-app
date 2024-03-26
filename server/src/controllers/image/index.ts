import { Response, Request } from "express";
import { ImageRepository } from "../../repository/image/image.repository.js";

const getImages = async (_: Request, res: Response): Promise<void> => {
  try {
    const _imageRepository = ImageRepository.getInstance();

    const { images } = _imageRepository.getImages();

    res.status(200).json({ success: true, data: { images } });
  } catch (error) {
    res.status(400).json({ success: true });
  }

  return;
};

const addImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.title || !req.body.url) {
      res.status(400).json({ success: false });

      return;
    }

    const _imageRepository = ImageRepository.getInstance();

    const { image } = await _imageRepository.createImage({
      title: req.body.title,
      url: req.body.url,
    });

    res.status(200).json({ success: true, message: "Image created", image });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  return;
};

const updateImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const _imageRepository = ImageRepository.getInstance();

    const { image } = _imageRepository.updateImage({
      id: req.params.id,
      isFavourite: req.body.isFavourite,
      title: req.body.title,
    });

    res.status(200).json({
      success: true,
      message: "Image updated",
      image,
    });
  } catch (error) {
    res.status(400).json({ success: true });
  }

  return;
};

const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const _imageRepository = ImageRepository.getInstance();

    const { image } = _imageRepository.deleteImage({ id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Image deleted",
      image,
    });
  } catch (error) {
    res.status(400).json({ success: true });
  }

  return;
};

const batchImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const _imageRepository = ImageRepository.getInstance();

    const deletedImageIds =
      req.body?.deletedImageIds?.filter((id: string) => {
        return typeof id === "string";
      }) || [];

    const createdImages =
      req.body?.createdImages
        ?.filter(({ id }) => id)
        ?.map(({ id, url, title }) => ({ id, url, title })) || [];

    const updatedImages =
      req.body?.updatedImages
        ?.filter(({ id }) => id)
        ?.map(({ id, isFavourite, title }) => ({ id, isFavourite, title })) ||
      [];

    await _imageRepository.batchImages({
      deletedImageIds,
      createdImages,
      updatedImages,
    });

    res.status(200).json({
      success: true,
      message: "Batch Images Updated!",
    });
  } catch (error) {
    res.status(400).json({ success: true });
  }

  return;
};

export { getImages, addImage, updateImage, deleteImage, batchImages };
