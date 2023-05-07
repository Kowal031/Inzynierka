import {
  styled,
  Box,
  Typography,
  TableHead,
  TableBody,
  Table,
  TableCell,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { FC, useEffect, useState } from "react";
import exerciseApi from "../../../api/exerciseApi";
import exerciseBaseApi from "../../../api/exerciseBaseApi";
import { palette } from "../../../assets/palette";
import EditExercise from "../../../types/EditExercise";
import Exercise from "../../../types/Exercise";
import ExerciseBase from "../../../types/ExerciseBase";
import Training from "../../../types/Training";

import EditTrainingTable from "./EditTrainingTable";

const Cell = styled(TableCell)({
  verticalAlign: "bottom",
});

interface EditTrainingProps {
  allExercise: Exercise[];
  training: Training;
  handleRefreshTraining: () => void;
  handleOpenSnackBar:  (succesfull: boolean, message: string) => void
}

const EditTraining: FC<EditTrainingProps> = ({
  allExercise,
  training,
  handleRefreshTraining,
  handleOpenSnackBar,
}) => {
  const [title, setTitle] = useState<string>(training.name);
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase[]>([]);
  const [valueForSets, setValueForSets] = useState<number[]>([]);
  const [valueForExercise, setValueForExercise] = useState<{
    [key: number]: ExerciseBase | null;
  }>({});
  const [data, setData] = useState<number[]>();

  const inputValueExercise = (value: ExerciseBase, exerciseId: number) => {
    setValueForExercise({
      ...valueForExercise,
      [exerciseId]: value,
    });
  };
  useEffect(() => {
    void exerciseApi.getExerciseByTrainingId(training.id).then((response) => {
      const exercises = response.data;
      const exerciseData = exercises.reduce((acc: any, curr: Exercise) => {
        acc[curr.id] =
          exerciseBase.find((e) => e.id === curr.idExerciseBase) || null;
        return acc;
      }, {});
      setValueForExercise(exerciseData);
    });
  }, []);

  const changeTitle = (value: string) => {
    setTitle(value);
  };

  const inputValueSet = (value: any, exerciseId: any) => {
    setValueForSets({
      ...valueForSets,
      [exerciseId]: value,
    });
  };

  useEffect(() => {
    void exerciseBaseApi
      .getAllExerciseBase()
      .then(({ data }) => setExerciseBase(data));

    void exerciseApi
      .getExerciseByTrainingId(training.id)
      .then(({ data }) => setData(data.map((dat) => dat.idExerciseBase)));
  }, []);

  const handleOnSave = () => {
    const exercises: EditExercise[] = [];

    Object.keys(valueForExercise).forEach((id) => {
      const baseExercise = valueForExercise[parseInt(id)];
      const numberOfSeries = valueForSets[parseInt(id)];
      const defaultValue = exerciseBase.find(
        (e) => data?.includes(e.id) || null
      );

      if (baseExercise) {
        exercises.push({
          id: parseInt(id),
          idTraining: training.id,
          treningTitle: title,
          name: baseExercise.name,
          idExerciseBase: baseExercise.id,
          numberOfSeries,
        });
      } else if (
        valueForExercise[parseInt(id)] === null &&
        valueForSets[parseInt(id)]
      ) {
        exercises.push({
          id: parseInt(id),
          idTraining: training.id,
          treningTitle: title,
          name: defaultValue !== undefined ? defaultValue.name : "",
          idExerciseBase: defaultValue !== undefined ? defaultValue.id : 0,
          numberOfSeries,
        });
      }
    });
    void exerciseApi
      .updateExercise(exercises)
      .then(() => {
        handleOpenSnackBar(true, "Your workout has been updated!");
        handleRefreshTraining();
      })
      .catch((error) => {
        handleOpenSnackBar(true, "Something went wrong!");
        handleRefreshTraining();
      });
  };

  return (
    <Box>
      <Box sx={{ margin: "1rem 2rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "90%" }}>
          <Typography sx={{ margin: "1rem" }} variant="h4">
            Title:
          </Typography>
          <TextField
            variant="outlined"
            value={title}
            onChange={(event) => changeTitle(event.target.value)}
            color="info"
            fullWidth
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <Cell width="65%" align="left">
                Exercise
              </Cell>
              <Cell width="25%" align="left">
                Sets
              </Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExercise.map((exercise: Exercise) => (
              <EditTrainingTable
                key={exercise.id}
                exercise={exercise}
                exerciseBase={exerciseBase}
                trainingId={training.id}
                inputValueSet={inputValueSet}
                inputValueExercise={inputValueExercise}
                valueForExercise={valueForExercise[exercise.id]}
                valueForSets={valueForSets[exercise.id]}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ margin: "0rem 0 2rem 0", width: "85%" }}
          variant="contained"
          onClick={handleOnSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditTraining;
