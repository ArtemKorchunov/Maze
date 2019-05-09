import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Game } from "./components";
import ThemeProvider from "./ThemeProvider";

toast.configure();

function App() {
  return (
    <ThemeProvider>
      <>
        <Game />
        <ToastContainer />
      </>
    </ThemeProvider>
  );
}

export default App;
