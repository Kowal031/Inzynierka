import { TextField } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

type CustomTextFieldProps = {
  label: string;
  name: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextField: FC<CustomTextFieldProps> = ({
  label,
  name,
  changeHandler,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      onChange={changeHandler}
      variant={"outlined"}
      size={"small"}
      margin={"dense"}
    />
  );
};

export default CustomTextField;
