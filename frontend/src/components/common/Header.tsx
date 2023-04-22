import { Box, styled } from "@mui/material";
import { FC } from "react";
import { palette } from "../../assets/palette";
import Navigation from "./navigation/Navigation";

const Container = styled(Box)({
  boxShadow: "0px 5px 21px 0px rgba(66, 68, 90, 1)",
  background: palette.white,
});

const Header: FC = () => {
  return (
    <Container>
      <Navigation />
    </Container>
  );
};
export default Header;
