"use client";

import React, { useCallback, useEffect, useRef } from "react";

import useWindowSize from "@/hooks/useWindowSize";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const windowSize = useWindowSize();
  const scrollingContainerRef = useRef<HTMLDivElement | null>(null);

  interface ScrollData {
    ease: number;
    current: number;
    rounded: number;
    previous: number;
  }

  const data: ScrollData = {
    ease: 0.03,
    current: 0,
    rounded: 0,
    previous: 0,
  };

  useEffect(() => {
    setBodyHeight();
  }, [windowSize.height]);

  const setBodyHeight = () => {
    if (scrollingContainerRef.current) {
      document.body.style.height = `${
        scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
    }
  };

  const smoothScrollingHandler = useCallback(() => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (scrollingContainerRef.current) {
      scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;
    }

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, [smoothScrollingHandler]);

  return (
    <div
      ref={scrollingContainerRef}
      className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-fit overflow-hidden"
    >
      {children}
    </div>
  );
}
