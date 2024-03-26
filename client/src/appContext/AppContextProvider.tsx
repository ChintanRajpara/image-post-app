import { createContext } from "react";
import useImages from "../hooks/useImages";
import { AppContextType } from "../types/appContext.types";

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { images, createImage, deleteImage, updateImage } = useImages();

  return (
    <AppContext.Provider
      value={{ images, createImage, deleteImage, updateImage }}
    >
      {children}
    </AppContext.Provider>
  );
};
