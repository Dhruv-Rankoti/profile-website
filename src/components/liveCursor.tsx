"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useRef, useState } from "react";

import { useVisible } from "@/context/VisibleContext";
import { useIsClient } from "@/hooks/use-is-client";

const nekoSpeed = 10;
const spriteSets = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

export default function LiveCursor() {
  const { visible } = useVisible();
  const { theme: resolvedTheme } = useTheme();
  const isClient = useIsClient();
  const nekoRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastFrameTimestampRef = useRef<number | undefined>(undefined);

  const nekoPosRef = useRef({ x: 32, y: 32 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [nekoPos, setNekoPos] = useState({ x: 32, y: 32 });

  const frameCountRef = useRef(0);
  const idleTimeRef = useRef(0);
  const idleAnimationRef = useRef<string | null>(null);
  const idleAnimationFrameRef = useRef(0);

  // Determine sprite image based on theme - default to light mode for SSR
  const spriteImage = "/oneko.gif";

  const setSpriteFrame = (name: string, frame: number) => {
    const spriteSet = spriteSets[name as keyof typeof spriteSets];
    if (!spriteSet) return;

    const spriteFrame = spriteSet[frame % spriteSet.length];
    if (nekoRef.current) {
      nekoRef.current.style.backgroundPosition = `${spriteFrame[0] * 32}px ${spriteFrame[1] * 32}px`;
    }
  };

  // Initialize sprite frame on mount
  useEffect(() => {
    if (nekoRef.current && isClient) {
      setSpriteFrame("idle", 0);
    }
  }, [isClient]);

  useEffect(() => {
    const resetIdleAnimation = () => {
      idleAnimationRef.current = null;
      idleAnimationFrameRef.current = 0;
    };

    const handleIdle = () => {
      idleTimeRef.current += 1;

      // Every ~20 seconds
      if (
        idleTimeRef.current > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimationRef.current === null
      ) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosRef.current.x < 32) {
          availableIdleAnimations.push("scratchWallW");
        }
        if (nekoPosRef.current.y < 32) {
          availableIdleAnimations.push("scratchWallN");
        }
        if (nekoPosRef.current.x > window.innerWidth - 32) {
          availableIdleAnimations.push("scratchWallE");
        }
        if (nekoPosRef.current.y > window.innerHeight - 32) {
          availableIdleAnimations.push("scratchWallS");
        }
        idleAnimationRef.current =
          availableIdleAnimations[
            Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      const idleAnimation = idleAnimationRef.current;
      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrameRef.current < 8) {
            setSpriteFrame("tired", 0);
            break;
          }
          setSpriteFrame(
            "sleeping",
            Math.floor(idleAnimationFrameRef.current / 4)
          );
          if (idleAnimationFrameRef.current > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSpriteFrame(idleAnimation, idleAnimationFrameRef.current);
          if (idleAnimationFrameRef.current > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSpriteFrame("idle", 0);
          return;
      }
      idleAnimationFrameRef.current += 1;
    };
    if (!visible) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = (timestamp: number) => {
      if (!visible || !nekoRef.current) {
        return;
      }

      if (lastFrameTimestampRef.current === undefined) {
        lastFrameTimestampRef.current = timestamp;
      }

      if (timestamp - (lastFrameTimestampRef.current || 0) > 100) {
        lastFrameTimestampRef.current = timestamp;
        frameCountRef.current += 1;

        const diffX = nekoPosRef.current.x - mousePosRef.current.x;
        const diffY = nekoPosRef.current.y - mousePosRef.current.y;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
          handleIdle();
          // Idle: Only update sprite (DOM), NO state update (re-render)
        } else {
          idleAnimationRef.current = null;
          idleAnimationFrameRef.current = 0;

          if (idleTimeRef.current > 1) {
            setSpriteFrame("alert", 0);
            idleTimeRef.current = Math.min(idleTimeRef.current, 7);
            idleTimeRef.current -= 1;
            setNekoPos({ ...nekoPosRef.current });
          } else {
            let direction = "";
            direction += diffY / distance > 0.5 ? "N" : "";
            direction += diffY / distance < -0.5 ? "S" : "";
            direction += diffX / distance > 0.5 ? "W" : "";
            direction += diffX / distance < -0.5 ? "E" : "";

            setSpriteFrame(direction || "idle", frameCountRef.current);

            const newX = nekoPosRef.current.x - (diffX / distance) * nekoSpeed;
            const newY = nekoPosRef.current.y - (diffY / distance) * nekoSpeed;

            nekoPosRef.current = {
              x: Math.min(Math.max(16, newX), window.innerWidth - 16),
              y: Math.min(Math.max(16, newY), window.innerHeight - 16),
            };
            setNekoPos({ ...nekoPosRef.current });
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [visible]);

  // Update filter when theme changes
  useEffect(() => {
    if (nekoRef.current) {
      nekoRef.current.style.filter =
        resolvedTheme === "light" ? "invert(1) brightness(1.8)" : "none";
    }
  }, [resolvedTheme]);

  // Don't render on server to avoid hydration mismatch
  if (!isClient || !visible) {
    return null;
  }

  return (
    <div
      ref={nekoRef}
      id="oneko"
      aria-hidden="true"
      className="pointer-events-none fixed"
      style={{
        width: "32px",
        height: "32px",
        imageRendering: "pixelated",
        left: `${nekoPos.x - 16}px`,
        top: `${nekoPos.y - 16}px`,
        backgroundImage: `url(/oneko.gif)`,
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        zIndex: 2147483647,
      }}
    />
  );
}
