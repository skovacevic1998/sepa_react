import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { NalogInputForm } from "../utilities/NalogInputForm";

interface ThemeProp {
  colorMode: any;
  theme: any;
  ColorModeContext: any;
  Item: any;
  getBackgroundColor: any;
}

export const UnosNaloga: React.FC<ThemeProp> = ({
  colorMode,
  theme,
  ColorModeContext,
  Item,
  getBackgroundColor,
}) => {
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Item>
          <Typography variant="h2" fontWeight="bold" style={{ margin: "1rem" }}>
            UNOS GOTOVINSKIH NALOGA
          </Typography>
        </Item>
        <Item>
          <NalogInputForm Item={Item} />
        </Item>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
