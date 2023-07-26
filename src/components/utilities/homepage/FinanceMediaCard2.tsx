import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FinanceCardImg from "../../../assets/financeCardImg2.jpg";

interface CardProp {
  getBackgroundColor: any;
}

export const FinanceMediaCard2: React.FC<CardProp> = ({
  getBackgroundColor,
}) => {
  return (
    <Card sx={{ borderRadius: "0px 5px 5px 0px" }}>
      <CardMedia
        sx={{ height: 240, width: 340 }}
        image={FinanceCardImg}
        title="green iguana"
      />
      <CardContent
        style={{
          textAlign: "left",
          justifyContent: "center",
          backgroundColor: getBackgroundColor,
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          Što možemo učiniti za vas?
        </Typography>
      </CardContent>
    </Card>
  );
};
