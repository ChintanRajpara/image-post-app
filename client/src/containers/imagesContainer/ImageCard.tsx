import { useAppContext } from "../../appContext/useAppContext";
import { ImageType } from "../../types/image.types";

const ImageCard = ({ image }: { image: ImageType }) => {
  const { updateImage, deleteImage } = useAppContext();

  const { title, id, isFavourite, url } = image;

  return (
    <div className="w-full p-3 shadow-md rounded flex-1 flex flex-col">
      <div>
        <p className="text-2xl font-bold">{title}</p>
      </div>
      <div className="flex flex-1">
        <img src={url} alt={id} />
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => {
            updateImage({
              id,
              isFavourite: !isFavourite,
            });
          }}
          className="btn btn-ghost btn-sm"
        >
          <p className={`text-xl ${isFavourite ? "text-red-600" : ""}`}>
            &#9829;
          </p>
        </button>

        <button
          onClick={() => {
            deleteImage({ id });
          }}
          className="btn btn-sm btn-error "
        >
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
