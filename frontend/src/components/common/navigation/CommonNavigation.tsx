import { Typography, Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import RouteItems from "../../../routes/RouteItems";
import { palette } from "../../../assets/palette";
import { getToken, removeTokern } from "../../../utils/Token";
import { useNavigate } from "react-router-dom";

// Styled components
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

const Logout = styled(Typography)({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  cursor: "pointer",
});

const Logo = styled(Typography)({
  color: palette.black,
});

// Component
const CommonNavigation: FC = () => {
  const navigate = useNavigate();
  const currentLocation = window.location.pathname;
  const [changeOnClick, setChangeOnClick] = useState<number>(-1);
  const [commonToken, setCommonToken] = useState<boolean>(false);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setCommonToken(true);
    } else {
      setCommonToken(false);
    }
  }, []);

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
      {commonToken ? (
        <CommonBox>
          {RouteItems.map(
            ({ toPath, name }, index) =>
              index !== RouteItems.length - 1 && (
                <ListItem key={toPath}>
                  <NavLink
                    to={toPath}
                    onClick={() =>
                      handleNavLinkClick(index, changeOnClick, setChangeOnClick)
                    }
                    className={({ isActive }) => setClassName(isActive)}
                  >
                    <NavLinkText
                      currentLocation={currentLocation}
                      pathname={toPath}
                    >
                      {name}
                    </NavLinkText>
                  </NavLink>
                </ListItem>
              )
          )}
          <Logout
            onClick={() => {
              removeTokern();
              navigate("/");
              window.location.reload();
            }}
          >
            Logout
          </Logout>
        </CommonBox>
      ) : (
        <CommonBox>
          <ListItem>
            {currentLocation !== "/register" ? (
              <NavLink to="/register">
                <NavLinkText
                  currentLocation={currentLocation}
                  pathname="/register"
                >
                  Register
                </NavLinkText>
              </NavLink>
            ) : (
              <NavLink to="/">
                <NavLinkText currentLocation={currentLocation} pathname="/">
                  Login
                </NavLinkText>
              </NavLink>
            )}
          </ListItem>
        </CommonBox>
      )}
    </Container>
  );
};

export default CommonNavigation;
