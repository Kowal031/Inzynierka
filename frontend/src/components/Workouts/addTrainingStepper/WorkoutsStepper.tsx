import { FC, useEffect, useState } from "react";
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
import StepSubmitWorkout from "./Steps/StepSubmitWorkout";
import StepTrainingDetails from "./Steps/StepTrainingDetails";
import StepWorkoutSetsWeight from "./Steps/StepWorkoutSetsWeight";
import Exercise from "../../../types/Exercise";
import exerciseApi from "../../../api/exerciseApi";
import getTrainingId from "../../../utils/GetTrainingId";

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
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valueForExercise: ExerciseBase | null;
  valueForSets: number;
  inputValueExercise: (value: ExerciseBase | null) => void;
  inputValueSet: (valueForSets: number) => void;
  stepperBackManagement: () => void;
  stepperNextManagement: () => void;
  steps: string[];
  title: string;
}

const WorkoutsStepper: FC<WorkoutsStepperProps> = ({
  activeStep,
  handleChange,
  valueForExercise,
  valueForSets,
  inputValueExercise,
  inputValueSet,
  stepperBackManagement,
  stepperNextManagement,
  steps,
  title,
}) => {
  const [lastTrainingId, setLastTrainingId] = useState<number>(0);
  const [myExercise, setMyExercise] = useState<Exercise[]>([]);
  const validationForNextButton = () => {
    switch (activeStep) {
      case 0:
        return title.length < 1;

      case 1:
        return myExercise.length < 1;
      default:
        return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await getTrainingId();
      setLastTrainingId(id);
    };
    fetchData();
  }, []);

  const changeMyExercise = () => {
    void exerciseApi
      .getExerciseByTrainingId(lastTrainingId)
      .then(({ data }) => setMyExercise(data));
  };

  const convertedSteps = activeStep;
  const stepsContent = [
    <StepTrainingDetails
      handleChange={handleChange}
      title={title}
    />,
    <StepWorkoutSetsWeight
      valueForExercise={valueForExercise}
      valueForSets={valueForSets}
      inputValueExercise={inputValueExercise}
      inputValueSet={inputValueSet}
      changeMyExercise={changeMyExercise}
      myExercise={myExercise}
      lastTrainingId={lastTrainingId}
    />,
    <StepSubmitWorkout
      myExercise={myExercise}
      title={title}
      lastTrainingId={lastTrainingId}
    />,
  ];

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
        <Button
        variant="contained"
          onClick={stepperNextManagement}
          disabled={validationForNextButton()}
        >
          {convertedSteps === steps.length - 1 ? "Confirm" : "Next"}
        </Button>
      </ButtonContainer>
    </BoxContainer>
  );
};

export default WorkoutsStepper;
