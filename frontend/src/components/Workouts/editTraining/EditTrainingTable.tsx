import {
  Autocomplete,
  styled,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { FC, ChangeEvent } from "react";
import Exercise from "../../../types/Exercise";
import ExerciseBase from "../../../types/ExerciseBase";

const StyledTableRow = styled(TableRow)({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

interface EditTrainingTableProps {
  exercise: Exercise;
  exerciseBase: ExerciseBase[];
  inputValueSet: (valueForSets: number, exerciseId: number) => void;
  inputValueExercise: (value: ExerciseBase, exerciseId: number) => void;
  valueForExercise: ExerciseBase | null;
  valueForSets: number;
}

const EditTrainingTable: FC<EditTrainingTableProps> = ({
  valueForExercise,
  valueForSets,
  exerciseBase,
  inputValueSet,
  inputValueExercise,
  exercise,
}) => {
  const defaultValue =
    exerciseBase.find((e) => e.id === exercise.idExerciseBase) || null;

  return (
    <StyledTableRow>
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
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            return inputValueSet(Number(event.target.value), exercise.id);
          }}
        />
      </TableCell>
    </StyledTableRow>
  );
};

export default EditTrainingTable;
