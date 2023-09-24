"use client";

// Importing React and required dependencies
import React, { useCallback, useEffect, useRef } from "react";

import useWindowSize from "@/hooks/useWindowSize";

// Defining the SmoothScrollProps interface
interface SmoothScrollProps {
  children: React.ReactNode;
}

// Defining the ScrollData interface
interface ScrollData {
  ease: number;
  current: number;
  rounded: number;
  previous: number;
}

// Exporting the SmoothScroll component
export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Using the useWindowSize hook to get the window size
  const windowSize = useWindowSize();

  // Ref for the scrolling container
  const scrollingContainerRef = useRef<HTMLDivElement | null>(null);

  // Function to set the body height based on the scrolling container's height
  const setBodyHeight = () => {
    if (scrollingContainerRef.current) {
      document.body.style.height = `${
        scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
    }
  };

  // Initializing the scroll data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: ScrollData = {
    ease: 0.05,
    current: 0,
    rounded: 0,
    previous: 0,
  };

  // Callback function for smooth scrolling
  const smoothScrollingHandler = useCallback(() => {
    // Updating scroll data
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (scrollingContainerRef.current) {
      // Applying transform to the scrolling container
      scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;
    }

    // Recursive call for smooth scrolling
    requestAnimationFrame(smoothScrollingHandler);
  }, [data]);

  // Effect to initialize smooth scrolling
  useEffect(() => {
    requestAnimationFrame(smoothScrollingHandler);
  }, [smoothScrollingHandler]);

  // Rendering the scrolling container with children
  return (
    <div
      ref={scrollingContainerRef}
      className="fixed top-0 left-0 w-full min-h-screen overflow-hidden"
    >
      {children}
    </div>
  );
}
