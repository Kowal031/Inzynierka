import { FC } from "react";
import {
  Box,
  Button,
  styled,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ExerciseBase from "../../../types/ExerciseBase";
import MuscleGroupInjuriesState from "../../../types/MuscleGroupInjuriesState";
import StepSubmitWorkout from "./Steps/StepSubmitWorkout";
import StepTrainingDetails from "./Steps/StepTrainingDetails";
import StepWorkoutSetsWeight from "./Steps/StepWorkoutSetsWeight";

const BoxContainer = styled(Box)({
  width: "100%",
});

const ButtonContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingTop: "1rem",
});

interface WorkoutsStepperProps {
  activeStep: number;
  handleChangeCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  state: MuscleGroupInjuriesState;
  valueForExercise: ExerciseBase | null;
  valueForSets: number;
  inputValueExercise: (value: ExerciseBase | null) => void;
  inputValueSet: (valueForSets: number) => void;
  stepperBackManagement: () => void;
  stepperNextManagement: () => void;
  steps: string[];
}

const WorkoutsStepper: FC<WorkoutsStepperProps> = ({
  activeStep,
  handleChangeCheckbox,
  handleChange,
  state,
  valueForExercise,
  valueForSets,
  inputValueExercise,
  inputValueSet,
  stepperBackManagement,
  stepperNextManagement,
  steps,
}) => {
  const convertedSteps = activeStep 
  const stepsContent = [
    <StepTrainingDetails
      handleChangeCheckbox={handleChangeCheckbox}
      handleChange={handleChange}
      state={state}
    />,
    <StepWorkoutSetsWeight
      valueForExercise={valueForExercise}
      valueForSets={valueForSets}
      inputValueExercise={inputValueExercise}
      inputValueSet={inputValueSet}
    />,
    <StepSubmitWorkout />,
  ];
console.log(convertedSteps)
  return (
    <BoxContainer>
      <Stepper activeStep={convertedSteps}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography mt="5px" mb="1px">
        {stepsContent[convertedSteps]}
      </Typography>
      <ButtonContainer>
        <Button color="inherit" onClick={stepperBackManagement}>
          {convertedSteps === 0 ? "Exit" : "Back"}
        </Button>
        <Button onClick={stepperNextManagement}>
          {convertedSteps === steps.length - 1 ? "Confirm" : "Next"}
        </Button>
      </ButtonContainer>
    </BoxContainer>
  );
};

export default WorkoutsStepper;
