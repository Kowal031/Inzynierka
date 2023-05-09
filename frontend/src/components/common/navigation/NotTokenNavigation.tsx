import { Typography, Box } from "@mui/material";
import { FC, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { palette } from "../../../assets/palette";

const Container = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "1rem",
  marginRight: "1rem",
});

const CommonBox = styled(Box)({
  display: "flex",
});

const ListItem = styled.li`
  & {
    display: flex;
    align-items: center;
  }
  & > a {
    font-size: 1rem;
    text-decoration: none;
  }
`;

const NavLinkText = styled(Typography)<{
  currentLocation: string;
  pathname: string;
}>(({ currentLocation, pathname }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  color: currentLocation === pathname ? palette.blue : palette.black,
  borderBottom: currentLocation === pathname ? `3px solid ${palette.blue}` : "",
  "&:hover": {
    color: palette.blue,
    opacity: "0.5",
  },
}));

const Logo = styled(Typography)({
  color: palette.black,
});

const NotTokenNavigation: FC = () => {
  const currentLocation = window.location.pathname;
  const [changeOnClick, setChangeOnClick] = useState<number>(-1);

  const setClassName = (isActive: boolean): string | undefined =>
    isActive ? "selected" : undefined;

  const handleNavLinkClick = (
    id: number,
    changeOnClick: number,
    setChangeOnClick: (id: number) => void
  ): void => {
    setChangeOnClick(changeOnClick === id ? -1 : id);
  };

  return (
    <Container>
      <ListItem>
        <NavLink
          to="/"
          onClick={() =>
            handleNavLinkClick(-1, changeOnClick, setChangeOnClick)
          }
        >
          <Logo variant="h3">My Workout</Logo>
        </NavLink>
      </ListItem>
      <CommonBox>
        <ListItem>
          <NavLink
            to="/"
            className={({ isActive }) => setClassName(isActive)}
            onClick={() =>
              handleNavLinkClick(2, changeOnClick, setChangeOnClick)
            }
          >
            <NavLinkText currentLocation={currentLocation} pathname="/">
              Login
            </NavLinkText>
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => setClassName(isActive)}
            onClick={() =>
              handleNavLinkClick(1, changeOnClick, setChangeOnClick)
            }
          >
            <NavLinkText currentLocation={currentLocation} pathname="/register">
              Register
            </NavLinkText>
          </NavLink>
        </ListItem>
      </CommonBox>
    </Container>
  );
};

export default NotTokenNavigation;
