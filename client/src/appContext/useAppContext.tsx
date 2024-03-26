import { useContext } from "react";
import { AppContextType } from "../types/appContext.types";
import { AppContext } from "./AppContextProvider";

export const useAppContext = (): AppContextType => useContext(AppContext);
