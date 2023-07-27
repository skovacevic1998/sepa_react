import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FinanceCardImg from "../../../assets/financeCardImg3.jpg";

interface CardProp {
  getBackgroundColor: any;
}

export const FinanceMediaCard3: React.FC<CardProp> = ({
  getBackgroundColor,
}) => {
  return (
    <Card sx={{ borderRadius: "5px 0px 0px 5px" }}>
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
          Podrška korisnicima
        </Typography>
      </CardContent>
    </Card>
  );
};
