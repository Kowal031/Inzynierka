import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import CustomTextField from "../../../common/CustomTextField";
import SwitchComponent from "../../../common/SwitchComponent";
import { object, string, number, date, InferType } from "yup";

const BasicForm = styled(`form`)({
  display: "flex",
  flexDirection: "column",
});
const Container = styled(Box)({
  backgroundColor: "#ffffff",

  padding: 30,
  textAlign: "center",
});

interface StepTrainingDetails {
  handleChangeCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  state: {
    schoulder: boolean;
    chest: boolean;
    back: boolean;
    biceps: boolean;
    triceps: boolean;
    abdominal: boolean;
    buttocks: boolean;
    quadraceps: boolean;
    hamstring: boolean;
    claves: boolean;
  };

}

const StepTrainingDetais: FC<StepTrainingDetails> = ({
  handleChangeCheckbox,
  handleChange,
  state,
  title
}) => {
  const [checked, setChecked] = useState(false);

  const {
    schoulder,
    chest,
    back,
    biceps,
    triceps,
    abdominal,
    buttocks,
    quadraceps,
    hamstring,
    claves,
  } = state;

  const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


  return (
    <Container>
      <BasicForm>
        <TextField
          onChange={handleChange}
          required
          label={"Add Training name (1 - 50 chars)"}
          name={"title"}
          value={title}
          inputProps={{ maxLength: 50 }}
      
        />
        <Box mt="0.5rem" mb="0.5rem" display="flex">
          <Typography mr="1rem">
            Do you have any injuries or some part of your muscles hurts?
          </Typography>
          <SwitchComponent
            checked={checked}
            handleChange={handleChangeSwitch}
          />
        </Box>
        {checked && (
          <Box display="flex" flexDirection="column">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={schoulder}
                    onChange={handleChangeCheckbox}
                    name="schoulder"
                  />
                }
                label="Schoulder Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={chest}
                    onChange={handleChangeCheckbox}
                    name="chest"
                  />
                }
                label="Chest Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={back}
                    onChange={handleChangeCheckbox}
                    name="back"
                  />
                }
                label="Back Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={biceps}
                    onChange={handleChangeCheckbox}
                    name="biceps"
                  />
                }
                label="Biceps Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={triceps}
                    onChange={handleChangeCheckbox}
                    name="triceps"
                  />
                }
                label="Triceps Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={abdominal}
                    onChange={handleChangeCheckbox}
                    name="abdominal"
                  />
                }
                label="Abdominal Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={buttocks}
                    onChange={handleChangeCheckbox}
                    name="buttocks"
                  />
                }
                label="Buttocks Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={quadraceps}
                    onChange={handleChangeCheckbox}
                    name="quadraceps"
                  />
                }
                label="Quadraceps Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hamstring}
                    onChange={handleChangeCheckbox}
                    name="hamstring"
                  />
                }
                label="Hamstring Injuries"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={claves}
                    onChange={handleChangeCheckbox}
                    name="claves"
                  />
                }
                label="Claves Injuries"
              />
            </FormGroup>
          </Box>
        )}
      </BasicForm>
    </Container>
  );
};
export default StepTrainingDetais;
