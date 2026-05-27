"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface VisibleContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const VisibleContext = createContext<VisibleContextType | undefined>(undefined);

export function VisibleContextProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  // Optionally, you can add logic to control visibility based on user preferences
  // For example, hide cursors when user prefers reduced motion

  return (
    <VisibleContext.Provider value={{ visible, setVisible }}>
      {children}
    </VisibleContext.Provider>
  );
}

export function useVisible() {
  const context = useContext(VisibleContext);
  if (context === undefined) {
    throw new Error("useVisible must be used within a VisibleContextProvider");
  }
  return context;
}
