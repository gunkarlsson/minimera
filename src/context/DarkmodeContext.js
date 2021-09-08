import React, { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../style/Themes";

//Defining the context
const DarkmodeContext = createContext();

//Creating a hook to reach the context in a simple way I guess?
export function useDarkmodeContext() {
  return useContext(DarkmodeContext);
}

//Not sure what this children guy is doing here?
export function DarkmodeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  //Everything I want to be able to reach anywhere in the project, I put inside this object
  const value = {
    theme,
    darkTheme,
    lightTheme,
    themeToggler,
  };

  //Returning the provider with value as prop
  return (
    <DarkmodeContext.Provider value={value}>
      {/* Not sure what this children guy is doing? */}
      {children}
    </DarkmodeContext.Provider>
  );
}
