import { Box, styled } from "@mui/material";
import { FC } from "react";
import { palette } from "../assets/palette";
import Navigation from "./navigation/Navigation";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  background: palette.black,
});

const Header: FC = () => {
  return (
    <Container>
      <Navigation />
    </Container>
  );
};
export default Header;
