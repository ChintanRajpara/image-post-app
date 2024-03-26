import { useEffect, useRef, useState } from "react";
import { createUID } from "../../utils/createUID";
import { useAppContext } from "../../appContext/useAppContext";

const NewImageContainer = () => {
  const { createImage } = useAppContext();

  const [url, setUrl] = useState("");

  const urlRef = useRef(url);

  useEffect(() => {
    urlRef.current = url;
  }, [url]);

  const add = () => {
    const url = urlRef.current;

    if (!url) {
      return;
    }

    const id = createUID();

    createImage({
      url,
      id,
      title: `Image #${id}`,
    });

    setUrl("");
  };

  return (
    <div className="flex flex-1 items-center justify-center my-6 gap-3">
      <input
        className="input w-full input-bordered input-info"
        placeholder="Add new image. Enter url of any image, giffy, etc.."
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        value={url}
      />
      <button
        onClick={() => {
          add();
        }}
        className="btn btn-info"
      >
        <p className="text-3xl">+</p>
      </button>
    </div>
  );
};

export default NewImageContainer;
