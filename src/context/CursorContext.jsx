import React, { createContext, useContext, useState, useEffect } from "react";

const CursorContext = createContext({
  cursorType: "default",
  cursorText: "",
  setCursorType: () => {},
  setCursorText: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState("default");
  const [cursorText, setCursorText] = useState("");

  const setCursor = (type, text = "") => {
    setCursorType(type);
    setCursorText(text);
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorText, setCursor, setCursorType, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
