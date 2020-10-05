import React, { createContext, useState } from "react";

export const LikeContext = createContext();

export default function LikeProvider({ children }) {
  const [isMovieLiked, setIsMovieLiked] = useState(false);

  return (
    <LikeContext.Provider value={{ isMovieLiked, setIsMovieLiked }}>
      {children}
    </LikeContext.Provider>
  );
}
