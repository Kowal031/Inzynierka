import { useState, ChangeEvent, FC, useContext } from "react";
import trainingApi from "../../../api/trainingApi";
import ExerciseBase from "../../../types/ExerciseBase";
import WorkoutsStepper from "./WorkoutsStepper";
import MuscleGroupInjuriesState from "../../../types/MuscleGroupInjuriesState";
import { Box } from "@mui/material";
import { TrainingContext } from "../../../context/training-context";

interface TitleProps {
  title: string;
}

interface ManageStepperProps {
  handleCloseModal: () => void;
  handleOpenSnackBar: (succesfull: boolean, message: string) => void;
}

const initialState: MuscleGroupInjuriesState = {
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
};

const ManageStepper: FC<ManageStepperProps> = ({
  handleCloseModal,
  handleOpenSnackBar,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [title, setTitle] = useState<TitleProps>({ title: "" });
  const [injuries, setInjuries] =
    useState<MuscleGroupInjuriesState>(initialState);
  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSets, setValueForSets] = useState<number>(1);
  const { userId } = useContext(TrainingContext);

  const stepperNextManagement = () => {
    switch (activeStep) {
      case 2:
        void trainingApi
          .createTraining(
            title.title,
            injuries.schoulder === true ? 3 : 0,
            injuries.chest === true ? 3 : 0,
            injuries.back === true ? 3 : 0,
            injuries.biceps === true ? 3 : 0,
            injuries.triceps === true ? 3 : 0,
            injuries.abdominal === true ? 3 : 0,
            injuries.buttocks === true ? 3 : 0,
            injuries.quadraceps === true ? 3 : 0,
            injuries.hamstring === true ? 3 : 0,
            injuries.claves === true ? 3 : 0,
            userId
          )
          .then(() => {
            handleOpenSnackBar(true, "You have successfully added a workout");
            handleCloseModal();
          })
          .catch((err) => {
            handleOpenSnackBar(false, "Something went wrong");
            handleCloseModal();
          });
        break;
      default:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
    }
  };

  const stepperBackManagement = () => {
    switch (activeStep) {
      case 0:
        handleCloseModal();

        break;
      default:
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        break;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle({ ...title, [event.target.name]: event.target.value });
  };

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setInjuries({
      ...injuries,
      [event.target.name]: event.target.checked,
    });
  };

  const inputValueExercise = (value: ExerciseBase | null) => {
    setValueForExercise(value);
  };

  const inputValueSet = (valueForSets: number) => {
    setValueForSets(valueForSets);
  };

  const steps = [
    "Select Training Details",
    "Select Workouts, Sets, Weight",
    "Create Training",
  ];

  return (
    <Box sx={{ padding: " 1.5rem" }}>
      <WorkoutsStepper
        activeStep={activeStep}
        handleChangeCheckbox={handleChangeCheckbox}
        handleChange={handleChange}
        state={injuries}
        valueForExercise={valueForExercise}
        valueForSets={valueForSets}
        inputValueExercise={inputValueExercise}
        inputValueSet={inputValueSet}
        stepperBackManagement={stepperBackManagement}
        stepperNextManagement={stepperNextManagement}
        steps={steps}
        title={title.title ?? ""}
      />
    </Box>
  );
};

export default ManageStepper;
