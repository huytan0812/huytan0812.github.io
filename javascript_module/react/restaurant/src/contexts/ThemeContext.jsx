import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ 'theme': theme, 'setTheme': setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

// Use custom hooks to make the code cleaner
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
    return useContext(ThemeContext);
}

