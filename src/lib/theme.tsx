import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_KEY = "taskflow-theme";

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

function getSystemTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") return "dark";
		const stored = localStorage.getItem(THEME_KEY);
		if (stored === "light" || stored === "dark" || stored === "system") {
			return stored;
		}
		return "system";
	});

	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
		if (theme === "system") {
			return getSystemTheme();
		}
		return theme;
	});

	useEffect(() => {
		if (theme === "system") {
			setResolvedTheme(getSystemTheme());
		} else {
			setResolvedTheme(theme);
		}
	}, [theme]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(resolvedTheme);

		localStorage.setItem(THEME_KEY, theme);
	}, [resolvedTheme, theme]);

	useEffect(() => {
		if (theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			setResolvedTheme(getSystemTheme());
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
