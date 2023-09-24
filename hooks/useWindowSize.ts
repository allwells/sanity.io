import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export default function useWindowSize(): WindowSize {
  const isClient = typeof window === "object"; // Check if window is available

  const getSize = (): WindowSize => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    };
  };

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

  useEffect(() => {
    if (!isClient) {
      return; // Return early if running on the server
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return windowSize;
}
