import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import ExerciseBase from "../../../../types/ExerciseBase";
import styled from "@mui/material/styles/styled";
import exerciseBaseApi from "../../../../api/exerciseBaseApi";
import exerciseApi from "../../../../api/exerciseApi";
import Exercise from "../../../../types/Exercise";
import ExerciseTable from "./ExerciseTable";
import { TrainingContext } from "../../../../context/training-context";

const FormContainer = styled("form")({
  paddingTop: "1rem",
  paddingBottom: "1rem",
  maxHeight: "37.5rem",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  overflow: "auto",
});

interface StepWorkoutSetsWeightProps {
  inputValueExercise: (value: ExerciseBase | null) => void;
  inputValueSet: (valueForSets: number) => void;
  valueForExercise: ExerciseBase | null;
  valueForSets: number;
  lastTrainingId: number;
  changeMyExercise: () => void;
  myExercise: Exercise[];
}

const StepWorkoutSetsWeight: FC<StepWorkoutSetsWeightProps> = ({
  inputValueExercise,
  inputValueSet,
  valueForSets,
  valueForExercise,
  lastTrainingId,
  changeMyExercise,
  myExercise,
}) => {
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { userId } = useContext(TrainingContext);

  const handleAddExercise = (e: React.FormEvent) => {
    setDisabled(true);
    e.preventDefault();
    if (valueForExercise !== null && valueForSets !== null) {
      void exerciseApi
        .addExercise(
          lastTrainingId,
          valueForExercise.name,
          userId,
          valueForExercise.id,
          valueForSets
        )
        .then(() => {
          changeMyExercise();
        })
        .then(() => {
          inputValueExercise(null);
          inputValueSet(1);
        })
        .finally(() => {
          setDisabled(false);
        });
    }
  };

  const handleRemoveItem = (id: number) => {
    exerciseApi.deleteExercise(id).then(() => changeMyExercise());
  };

  useEffect(() => {
    void exerciseBaseApi
      .getAllExerciseBase()
      .then(({ data }) => setExerciseBase(data));
  }, []);

  return (
    <>
      <Paper elevation={3}>
        <FormContainer
          sx={{
            marginTop: "1rem",
            padding: "1rem",
            gap: "1rem",
          }}
          onSubmit={handleAddExercise}
        >
          <Autocomplete
            id="filter-demo"
            options={exerciseBase}
            getOptionLabel={(exerciseBase) => exerciseBase.name}
            sx={{ width: 300 }}
            value={valueForExercise}
            onChange={(event, value) => inputValueExercise(value)}
            renderInput={(params) => (
              <TextField {...params} label="Choose exercise" />
            )}
          />
          <TextField
            id="outlined-basic"
            label="Choose Sets"
            type="number"
            InputProps={{
              inputProps: {
                min: 1,
              },
            }}
            value={valueForSets}
            onChange={(event) => inputValueSet(parseInt(event.target.value))}
          />
          <Button
            disabled={disabled || valueForExercise === null}
            variant="contained"
            sx={{
              border: "1rem",
              borderRadius: "5px",
            }}
            aria-label="fingerprint"
            color="primary"
            type="submit"
          >
            Accept
          </Button>
        </FormContainer>
      </Paper>
      <ExerciseTable
        myExercise={myExercise}
        handleRemoveItem={handleRemoveItem}
      />
    </>
  );
};

export default StepWorkoutSetsWeight;
