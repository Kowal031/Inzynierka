import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

type CustomTextFieldProps = {
  label: string;
  name: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextField = (props: CustomTextFieldProps) => {
  return (
    <TextField
      label={props.label}
      name={props.name}
      onChange={props.changeHandler}
      variant={"outlined"}
      size={"small"}
      margin={"dense"}
    />
  );
};

export default CustomTextField;
