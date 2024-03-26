import { AppContextProvider } from "./appContext/AppContextProvider";
import ImagesContainer from "./containers/imagesContainer/ImagesContainer";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AppContextProvider>
      <div className="m-6">
        <ImagesContainer />
      </div>

      <ToastContainer />
    </AppContextProvider>
  );
};

export default App;
