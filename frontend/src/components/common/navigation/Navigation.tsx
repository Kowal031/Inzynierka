import { Typography, Box } from "@mui/material";
import { FC, useState } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import RouteItems from "../../../routes/RouteItems";
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

interface CustomTypographyProps {
  changeOnClick: number;
  index: number;
  currentLocation: string;
  pathname: string;
}

const BasicTypography = styled(Typography)({
  display: "flex",
  alignItems: "center",
  padding: "0.5rem",
  color: palette.black,
});

const CustomTypography = styled(BasicTypography)<CustomTypographyProps>(
  ({ currentLocation, pathname }) => ({
    borderBottom:
      currentLocation === pathname ? `3px solid ${palette.blue}` : "",
    color: currentLocation === pathname ? palette.blue : "",
    "&:hover": {
      color: palette.blue,
      opacity: "0.5",
    },
  })
);

const Navigation: FC = () => {
  const currentLocation = window.location.pathname;
  const [changeOnClick, setChangeOnClick] = useState<number>(-1);
  const setClassName = (isActive: boolean): string | undefined =>
    isActive ? "selected" : undefined;

  const handleOnClick = (id: number): void => {
    setChangeOnClick(changeOnClick === id ? -1 : id);
  };

  return (
    <Container>
      <ListItem>
        <NavLink to="/" onClick={() => handleOnClick(-1)}>
          <BasicTypography variant="h3">My Workout</BasicTypography>
        </NavLink>
      </ListItem>
      <CommonBox>
        {RouteItems.map(({ toPath, name }, index) => (
          <ListItem key={toPath}>
            <NavLink
              to={toPath}
              onClick={() => handleOnClick(index)}
              className={({ isActive }) => setClassName(isActive)}
            >
              <CustomTypography
                changeOnClick={changeOnClick}
                index={index}
                currentLocation={currentLocation}
                pathname={toPath}
              >
                {name}
              </CustomTypography>
            </NavLink>
          </ListItem>
        ))}
      </CommonBox>
    </Container>
  );
};
export default Navigation;
