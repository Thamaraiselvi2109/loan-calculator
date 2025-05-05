import { createContext, useState,useMemo, type ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline, type PaletteMode } from "@mui/material";

interface ThemeContextType {
    toggleTheme: () => void;
    mode: PaletteMode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mode, setMode] = useState<PaletteMode>("light");

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    // Create the theme based on the mode (light/dark)
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "light"
                        ? {
                              // Light theme customization
                              primary: { main: "#1976d2" },
                              secondary: { main: "#d32f2f" },
                          }
                        : {
                              // Dark theme customization
                              primary: { main: "#90caf9" },
                              secondary: { main: "#f48fb1" },
                          }),
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* Resets styles to ensure proper theming */}
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
