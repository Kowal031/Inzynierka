import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FC, useEffect, useState } from "react";
import StepTrainingDetais from "./StepTrainingDetails";
import StepWorkoutSetsWeight from "./StepWorkoutSetsWeight";
import { styled } from "@mui/system";
import trainingApi from "../../../api/trainingApi";

const BoxContainer = styled(Box)({
  width: "100%",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingTop: "1rem",
});

const steps = [
  "Select Training Details",
  "Select Workouts,Sets,Weight",
  "Create Training",
];

interface AddWorkoutsStepperProps {
  handleCloseModal: () => void;
}

type Values = {
  title: string;
};

const AddWorkoutsStepper: FC<AddWorkoutsStepperProps> = ({
  handleCloseModal,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    AddTraining();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {};

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [values, setValues] = useState<Values>({
    title: "",
  });

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const [state, setState] = useState({
    schoulder: false,
    chest: false,
    back: false,
    biceps: false,
    triceps: false,
    abdominal: false,
    buttocks: false,
    quadraceps: false,
    hamstring: false,
    claves: false,
  });

  const stepLvl = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <StepTrainingDetais
            handleChangeCheckbox={handleChangeCheckbox}
            handleChange={handleChange}
            state={state}
            values={values}
          />
        );
      case 1:
        return <StepWorkoutSetsWeight />;
      case 3:
        break;
    }
  };

  const AddTraining = () => {
    trainingApi.createTraining(
      values.title,
      state.schoulder === true ? 3 : 0,
      state.chest === true ? 3 : 0,
      state.back === true ? 3 : 0,
      state.biceps === true ? 3 : 0,
      state.triceps === true ? 3 : 0,
      state.abdominal === true ? 3 : 0,
      state.buttocks === true ? 3 : 0,
      state.quadraceps === true ? 3 : 0,
      state.hamstring === true ? 3 : 0,
      state.claves === true ? 3 : 0
    );
  };

  return (
    <BoxContainer>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Add Title and Injuries</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add Workouts, Sets, Weight</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirm Training</StepLabel>
        </Step>
      </Stepper>
      <>
        <Typography mt="5px" mb="1px">
          {stepLvl(activeStep)}
        </Typography>
        <ButtonContainer>
          <Button
            color="inherit"
            onClick={activeStep === 0 ? handleCloseModal : handleBack}
          >
            {activeStep === 0 ? "Exit" : "Back"}
          </Button>
          <Button
            onClick={
              activeStep === steps.length ? handleCloseModal : handleNext
            }
          >
            {activeStep === steps.length ? "Finish" : "Next"}
          </Button>
        </ButtonContainer>
      </>
    </BoxContainer>
  );
};

export default AddWorkoutsStepper;
