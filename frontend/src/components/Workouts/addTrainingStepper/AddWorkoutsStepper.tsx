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
import ExerciseBase from "../../../types/ExerciseBase";
import StepSubmitWorkout from "./StepSubmitWorkout";
import exerciseApi from "../../../api/exerciseApi";

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
  lastTrainingId: number;
  handleCloseModal: () => void;
  openModal: boolean;
}

type Values = {
  title: string;
};

const AddWorkoutsStepper: FC<AddWorkoutsStepperProps> = ({
  handleCloseModal,
  lastTrainingId,
  openModal,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {};

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle({ ...title, [event.target.name]: event.target.value });
  };

  const [title, setTitle] = useState<Values>({
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

  const [formValues, setFormValues] = useState<
    Array<{ exercise: ExerciseBase | null; sets: number | null }>
  >([]);

  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSets, setValueForSets] = useState<number>(1);

  const handleRemoveItem = (index: number) => {
    setFormValues((prevFormValues) => {
      const updatedFormValues = [...prevFormValues];
      updatedFormValues.splice(index, 1);
      return updatedFormValues;
    });
  };

  const inputValueExercise = (value: ExerciseBase | null) => {
    setValueForExercise(value);
  };

  const inputValueSet = (valueForSets: number) => {
    setValueForSets(valueForSets);
  };

  const stepLvl = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <StepTrainingDetais
            handleChangeCheckbox={handleChangeCheckbox}
            handleChange={handleChange}
            state={state}
            values={title}
          />
        );
      case 1:
        return (
          <StepWorkoutSetsWeight
            formValues={formValues}
            valueForExercise={valueForExercise}
            updatedFormValues={updatedFormValues}
            valueForSets={valueForSets}
            handleRemoveItem={handleRemoveItem}
            inputValueExercise={inputValueExercise}
            inputValueSet={inputValueSet}
            lastTrainingId={lastTrainingId}
          />
        );
      case 2:
        return <StepSubmitWorkout state={state} formValues={formValues} />;
    }
  };

  const AddTraining = () => {
    trainingApi.createTraining(
      title.title,
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

  const stepperBackManagment = () => {
    activeStep === 0 ? handleCloseModal() : handleBack();
  };

  const stepperNextManagment = () => {
    if (activeStep === steps.length - 1) {
      AddTraining();
    } else {
      void trainingApi.deleteTraining(lastTrainingId).then(() => {});
    }

    activeStep === steps.length - 1 ? handleCloseModal() : handleNext();
  };

  const updatedFormValues = (
    formValues: {
      exercise: ExerciseBase | null;
      sets: number | null;
    }[]
  ) => {
    setFormValues(formValues);
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
          <Button color="inherit" onClick={stepperBackManagment}>
            {activeStep === 0 ? "Exit" : "Back"}
          </Button>
          <Button onClick={stepperNextManagment}>
            {activeStep === steps.length - 1 ? "Confirm" : "Next"}
          </Button>
        </ButtonContainer>
      </>
    </BoxContainer>
  );
};

export default AddWorkoutsStepper;
