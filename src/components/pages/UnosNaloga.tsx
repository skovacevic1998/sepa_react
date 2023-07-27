import { Typography } from "@mui/material";
import { NalogInputForm } from "../utilities/NalogInputForm";

interface ThemeProp {
  Item: any;
}

export const UnosNaloga: React.FC<ThemeProp> = ({ Item }) => {
  return (
    <>
      <Item>
        <Typography variant="h2" fontWeight="bold" style={{ margin: "1rem" }}>
          UNOS GOTOVINSKIH NALOGA
        </Typography>
      </Item>
      <Item>
        <NalogInputForm Item={Item} />
      </Item>
    </>
  );
};
