import { useState, ChangeEvent, FC } from "react";
import trainingApi from "../../../api/trainingApi";
import ExerciseBase from "../../../types/ExerciseBase";
import WorkoutsStepper from "./WorkoutsStepper";
import MuscleGroupInjuriesState from "../../../types/MuscleGroupInjuriesState";

interface TitleProps {
  title: string;
}

interface ManageStepperProps {
  lastTrainingId: number;
  handleCloseModal: () => void;
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
  lastTrainingId,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [title, setTitle] = useState<TitleProps>({ title: "" });
  const [state, setState] = useState<MuscleGroupInjuriesState>(initialState);
  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSets, setValueForSets] = useState<number>(1);

  const stepperNextManagement = () => {
    if (activeStep === steps.length - 1) {
      AddTraining();
    } else {
      void trainingApi.deleteTrainingById(lastTrainingId).then(() => {});
    }

    activeStep === steps.length - 1 ? handleCloseModal() : handleNext();
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle({ ...title, [event.target.name]: event.target.value });
  };

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const inputValueExercise = (value: ExerciseBase | null) => {
    setValueForExercise(value);
  };

  const inputValueSet = (valueForSets: number) => {
    setValueForSets(valueForSets);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    "Select Training Details",
    "Select Workouts, Sets, Weight",
    "Create Training",
  ];

  const stepperBackManagement = () => {
    activeStep === 0 ? handleCloseModal() : handleBack();
  };

  return (
    <WorkoutsStepper
      activeStep={activeStep}
      handleChangeCheckbox={handleChangeCheckbox}
      handleChange={handleChange}
      state={state}
      valueForExercise={valueForExercise}
      valueForSets={valueForSets}
      inputValueExercise={inputValueExercise}
      inputValueSet={inputValueSet}
      lastTrainingId={lastTrainingId}
      stepperBackManagement={stepperBackManagement}
      stepperNextManagement={stepperNextManagement}
      steps={steps}
    />
  );
};

export default ManageStepper;
