"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
}

interface ThemeContextValue {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme?: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  setTheme: () => {},
});

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyThemeClass(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

function disableTransitions() {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode("*,*::before,*::after{transition:none!important}"),
  );
  document.head.appendChild(style);
  window.getComputedStyle(document.body);
  return () => {
    document.head.removeChild(style);
  };
}

function createThemeStore(storageKey: string, fallbackTheme: Theme) {
  const listeners = new Set<() => void>();

  const subscribe = (onStoreChange: () => void) => {
    listeners.add(onStoreChange);

    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        onStoreChange();
      }
    };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", onStoreChange);
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(onStoreChange);
      media.removeEventListener("change", onStoreChange);
      window.removeEventListener("storage", onStorage);
    };
  };

  const getSnapshot = (): Theme => {
    try {
      return (
        (localStorage.getItem(storageKey) as Theme | null) ?? fallbackTheme
      );
    } catch {
      return fallbackTheme;
    }
  };

  const setTheme = (theme: Theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // localStorage may be unavailable in private mode
    }

    listeners.forEach((listener) => listener());
  };

  return { subscribe, getSnapshot, setTheme };
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  disableTransitionOnChange = false,
  storageKey = "theme",
}: ThemeProviderProps) {
  const store = useMemo(
    () => createThemeStore(storageKey, defaultTheme),
    [storageKey, defaultTheme],
  );

  const theme = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => defaultTheme,
  );

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  useLayoutEffect(() => {
    const cleanup = disableTransitionOnChange
      ? disableTransitions()
      : undefined;
    applyThemeClass(resolveTheme(theme));
    return cleanup;
  }, [theme, disableTransitionOnChange]);

  const setTheme = useCallback(
    (value: Theme) => {
      store.setTheme(value);
    },
    [store],
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
    }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
