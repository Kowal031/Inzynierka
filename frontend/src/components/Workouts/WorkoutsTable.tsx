import {
  Box,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { palette } from "../../assets/palette";
import Exercise from "../../types/Exercise";
import Training from "../../types/Training";
import exerciseApi from "../../api/exerciseApi";
import trainingApi from "../../api/trainingApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import WorkoutsItem from "./WorkoutsItem";

const ContainerForTable = styled(TableContainer)({
  maxWidth: "31.25rem",
  background: palette.white,
  boxShadow: "2px 2px 7px 0px rgba(66, 68, 90, 1)",
  margin: "1rem",
});

const ContainerForTabHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const ButtonIcon = styled(IconButton)({
  "&:hover": {
    background: "transparent",
    transform: "scale(1.1)",
  },
});

const ContainerForIcon = styled(Box)({
  display: "flex",
  flexDirection: "row",
  marginRight: "0.5rem",
});

const Cell = styled(TableCell)({
  verticalAlign: "bottom",
});

interface WorkoutsTableProps {
  training: Training;
  handleRefreshTraining: () => void;
}

const WorkoutsTable: FC<WorkoutsTableProps> = ({ training,handleRefreshTraining }) => {
  const [allExercise, setAllExercise] = useState<Exercise[]>([]);

  const onDeleteClick = (id: number) => {
    void trainingApi.deleteTrainingById(id).then(() => {
      //sprawdzić czy ćw z takim id istnieją
      void exerciseApi.deleteExercises(id).then(() => {
        handleRefreshTraining();
      });
    });
  };

  useEffect(() => {
    exerciseApi.getExerciseByTrainingId(training.id).then(({ data }) => {
      setAllExercise(data);
    });
  }, [training.id]);

  return (
    <ContainerForTable>
      <ContainerForTabHeader>
        <Typography sx={{ margin: "1rem" }} variant="h4">
          {training.name}
        </Typography>
        <ContainerForIcon>
          <ButtonIcon>
            <Tooltip title="Start workout" placement="top" arrow>
              <PlayCircleIcon sx={{ color: palette.blue, fontSize: 30 }} />
            </Tooltip>
          </ButtonIcon>

          <ButtonIcon>
            <Tooltip title="Edit workout" placement="top" arrow>
              <EditIcon sx={{ fontSize: 30 }} />
            </Tooltip>
          </ButtonIcon>

          <ButtonIcon>
            <Tooltip title="Delete workout" placement="top" arrow>
              <DeleteIcon
                sx={{ color: palette.error, fontSize: 30 }}
                onClick={() => onDeleteClick(training.id)}
              />
            </Tooltip>
          </ButtonIcon>
        </ContainerForIcon>
      </ContainerForTabHeader>

      <Table>
        <TableHead>
          <TableRow>
            <Cell align="left">Exercise</Cell>
            <Cell align="left">Average Sets</Cell>
            <Cell align="left">Average reps</Cell>
            <Cell align="left">Average weight</Cell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allExercise.map((exercise: Exercise) => (
            <WorkoutsItem exercise={exercise} />
          ))}
        </TableBody>
      </Table>
    </ContainerForTable>
  );
};
export default WorkoutsTable;
