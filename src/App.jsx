import React from "react";
import { Game } from "./components";

import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Game />
    </ThemeProvider>
  );
}

export default App;
