import {
  styled,
  TableContainer,
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

const ContainerForTable = styled(TableContainer)({
  width: "100%",
  background: palette.white,
  boxShadow: "2px 2px 7px 0px rgba(66, 68, 90, 1)",
  padding: "2rem",
});

const Cell = styled(TableCell)({
  verticalAlign: "bottom",
});

interface EditTrainingProps {
  allExercise: Exercise[];
  training: Training;
  handleRefreshTraining: () => void;
}

const EditTraining: FC<EditTrainingProps> = ({ allExercise, training,handleRefreshTraining }) => {
  const [title, setTitle] = useState<string>(training.name);
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase[]>([]);
  const [valueForSets, setValueForSets] = useState<number[]>([]);
  const [valueForExercise, setValueForExercise] = useState<{
    [key: number]: ExerciseBase | null;
  }>({});
  const [data, setData] = useState<EditExercise[]>();

  const inputValueExercise = (value: ExerciseBase, exerciseId: number) => {
    setValueForExercise({
      ...valueForExercise,
      [exerciseId]: value,
    });
  };

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
  }, []);

  const handleOnSave = () => {
    const exercises: EditExercise[] = [];

    Object.keys(valueForExercise).forEach((id) => {
      const exerciseBase = valueForExercise[parseInt(id)];
      const numberOfSeries = valueForSets[parseInt(id)];

      if (exerciseBase) {
        exercises.push({
          id: parseInt(id),
          idTraining: training.id,
          treningTitle: title,
          name: exerciseBase.name,
          idExerciseBase: exerciseBase.id,
          numberOfSeries,
        });
      }
    });
    void exerciseApi.updateExercise(exercises).then(()=>{
      handleRefreshTraining()
    })
  };



  return (
    <ContainerForTable>
      <Paper elevation={3} sx={{ padding: "2rem 0 0 0" }}>
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
        <Button variant="contained" fullWidth onClick={handleOnSave}>
          Save
        </Button>
      </Paper>
    </ContainerForTable>
  );
};

export default EditTraining;
