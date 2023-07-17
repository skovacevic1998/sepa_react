import React from "react";
import { ThemeProvider } from "@mui/material/styles";

interface ThemeProp {
  colorMode: any;
  theme: any;
  ColorModeContext: any;
}

export const Homepage: React.FC<ThemeProp> = ({
  colorMode,
  theme,
  ColorModeContext,
}) => {
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>Homepage</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
