import { styled, Stack, Typography, Switch } from "@mui/material";
import { ChangeEvent, FC } from "react";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: "2rem",
  height: "1rem",
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: "0.75rem",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(0.75rem)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: "0.125rem",
    "&.Mui-checked": {
      transform: "translateX(0.925rem)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "0.75rem",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: "1rem",
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

interface SwitchComponentProps {
  checked: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SwitchComponent: FC<SwitchComponentProps> = ({
  checked,
  handleChange,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>No</Typography>
      <AntSwitch checked={checked} onChange={handleChange} />
      <Typography>Yes</Typography>
    </Stack>
  );
};

export default SwitchComponent;
