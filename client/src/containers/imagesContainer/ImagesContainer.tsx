import { useAppContext } from "../../appContext/useAppContext";
import ImagesGrid from "./ImagesGrid";

const ImagesContainer = () => {
  const { images } = useAppContext();
  return (
    <div>
      <h2 className="font-bold text-6xl">Image Post App</h2>
      <hr />
      <div className="mt-5">
        <ImagesGrid {...{ images }} />
      </div>
    </div>
  );
};

export default ImagesContainer;
