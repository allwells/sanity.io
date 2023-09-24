"use client";

import styles from "@/styles/Layout.module.css";

import { useState, useEffect, ReactNode } from "react";

export default function TransitionLayout({
  children,
}: {
  children?: ReactNode;
}) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");

  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  return (
    <div
      onTransitionEnd={() => {
        if (transitionStage === "fadeOut") {
          setDisplayChildren(children);
          setTransitionStage("fadeIn");
        }
      }}
      style={{ transitionDuration: "0.7s" }}
      className={`${styles[transitionStage]} w-full`}
    >
      {displayChildren}
    </div>
  );
}
