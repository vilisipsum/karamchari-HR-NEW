"use client";

import React, { useEffect, useState } from "react";

export default function AnimatedBlobs() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Glow Blobs with Mouse Reactive Offset */}
      <div
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-marigold/15 blur-[120px] mix-blend-screen animate-blob-slow transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`,
        }}
      />
      <div
        className="absolute top-[25%] right-[10%] w-[450px] h-[450px] rounded-full bg-gulal-rose/20 blur-[130px] mix-blend-screen animate-blob-medium transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px)`,
        }}
      />
      <div
        className="absolute bottom-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-mint-teal/15 blur-[140px] mix-blend-screen animate-blob-fast transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
        }}
      />
      <div
        className="absolute bottom-[5%] right-[20%] w-[380px] h-[380px] rounded-full bg-indigo/25 blur-[110px] mix-blend-screen animate-blob-slow transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
        }}
      />
    </div>
  );
}
