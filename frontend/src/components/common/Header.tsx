import { Box, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { palette } from "../../assets/palette";
import { getToken } from "../../utils/Token";
import Navigation from "./navigation/CommonNavigation";
import NotTokenNavigation from "./navigation/NotTokenNavigation";

const Container = styled(Box)({
  boxShadow: "0px 5px 21px 0px rgba(66, 68, 90, 1)",
  background: palette.white,
});

const Header: FC = () => {
  const [commonToken, setCommonToken] = useState<boolean>(false);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setCommonToken(true);
    } else {
      setCommonToken(false);
    }
  }, []);
  return (
    <Container>
      {commonToken ? <Navigation /> : <NotTokenNavigation />}
    </Container>
  );
};
export default Header;
