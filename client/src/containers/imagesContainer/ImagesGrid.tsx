import ImageCard from "./ImageCard";
import NewImageContainer from "../newImageContainer/NewImageContainer";
import { ImageType } from "../../types/image.types";

const ImagesGrid = ({ images }: { images: ImageType[] }) => {
  return (
    <div className="grid-cols-3 gap-4 grid">
      {images.map((image) => (
        <ImageCard {...{ image }} />
      ))}

      <NewImageContainer />
    </div>
  );
};

export default ImagesGrid;
