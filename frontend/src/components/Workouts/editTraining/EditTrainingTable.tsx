import { Autocomplete, TableCell, TableRow, TextField } from "@mui/material";

import React, { useEffect } from "react";
import { FC } from "react";
import exerciseApi from "../../../api/exerciseApi";
import Exercise from "../../../types/Exercise";
import ExerciseBase from "../../../types/ExerciseBase";

interface EditTrainingTableProps {
  exercise: Exercise;
  exerciseBase: ExerciseBase[];
  trainingId: number;
  inputValueSet: (valueForSets: number, exerciseId: number) => void;
  inputValueExercise: (value: ExerciseBase, exerciseId: number) => void;
  valueForExercise: ExerciseBase | null;
  valueForSets: number;
}
const EditTrainingTable: FC<EditTrainingTableProps> = ({
  valueForExercise,
  valueForSets,
  exerciseBase,
  trainingId,
  inputValueSet,
  inputValueExercise,
  exercise,
}) => {
  // Set the initial default value
  const defaultValue =
    exerciseBase.find((e) => e.id === exercise.idExerciseBase) || null;


    

  return (
    <TableRow>
      <TableCell width="65%" align="left">
        <Autocomplete
          id={`${exercise.id}`}
          options={exerciseBase}
          getOptionLabel={(exerciseBase) => exerciseBase.name}
          value={valueForExercise || defaultValue}
          onChange={(event, value) =>
            inputValueExercise(
              value !== null ? value : exerciseBase[0],
              exercise.id
            )
          }
          renderInput={(params) => <TextField {...params} label="Exercise" />}
        />
      </TableCell>
      <TableCell width="25%" align="left">
        <TextField
          id="outlined-basic"
          label="Sets"
          type="number"
          InputProps={{
            inputProps: {
              min: 1,
            },
          }}
          value={valueForSets ?? exercise.numberOfSeries}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            inputValueSet(Number(event.target.value), exercise.id)
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default EditTrainingTable;
