import { Paper, Typography, Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import exerciseBaseApi from "../../../api/exerciseBaseApi";
import ExerciseBase from "../../../types/ExerciseBase";
import HistoryOfWorkouts from "../../../types/HistoryOfWorkouts";
import SloRenderValueForHistory from "../../../utils/SloRenderValueForHistory";

interface SelectWorkoutListProps {
  history: HistoryOfWorkouts[];
  inputValueExercise: (value: ExerciseBase | null) => void;
  valueForExercise: any;
}

const SelectWorkoutList: FC<SelectWorkoutListProps> = ({
  valueForExercise,
  inputValueExercise,
}) => {
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase[]>([]);

  useEffect(() => {
    void exerciseBaseApi
      .getAllExerciseBase()
      .then(({ data }) => setExerciseBase(data));
  }, []);

  return (
    <Box
      sx={{ padding: "1rem ", margin: "2rem 0", width: "35vw" }}
      component={Paper}
      elevation={3}
    >
      <Typography variant="h5">
        Check avarge performance in exercise{" "}
      </Typography>

      <Autocomplete
        id="filter-demo"
        options={exerciseBase}
        getOptionLabel={(exerciseBase) => exerciseBase.name}
        sx={{ width: 300, paddingTop: "0.5rem" }}
        value={valueForExercise}
        onChange={(event, value) => {
          inputValueExercise(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choose exercise" />
        )}
      />
    </Box>
  );
};
export default SelectWorkoutList;
