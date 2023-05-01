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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import trainingApi from "../../../api/trainingApi";
import exerciseApi from "../../../api/exerciseApi";
import { palette } from "../../../assets/palette";
import Exercise from "../../../types/Exercise";
import Training from "../../../types/Training";
import WorkoutsItem from "./WorkoutsItem";
import CommonModal from "../../common/CommonModal";
import EditTraining from "../editTraining/EditTraining";
import { useNavigate  } from "react-router-dom";
// import ExerciseBase from "../../../types/ExerciseBase";

const ContainerForTable = styled(TableContainer)({
  maxWidth: "32.25rem",
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

const WorkoutsTable: FC<WorkoutsTableProps> = ({
  training,
  handleRefreshTraining,
}) => {
  const [allExercise, setAllExercise] = useState<Exercise[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate  = useNavigate();

  const onDeleteClick = (id: number) => {
    void trainingApi.deleteTrainingById(id).then(() => {
      //sprawdzić czy ćw z takim id istnieją
      void exerciseApi.deleteExercises(id).then(() => {
        handleRefreshTraining();
      });
    });
  };

  const handleOnEditClick = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    handleRefreshTraining();
  };

  const handleOnPlayClick = (trainingId: number) => {
    navigate(`/workout/${trainingId}`)
  }

  useEffect(() => {
    exerciseApi.getExerciseByTrainingId(training.id).then(({ data }) => {
      setAllExercise(data);
    });
  }, [training.id,openEditModal]);

  return (
    <ContainerForTable>
      <ContainerForTabHeader>
        <Typography sx={{ margin: "1rem" }} variant="h4">
          {training.name}
        </Typography>
        <ContainerForIcon>
          <ButtonIcon>
            <Tooltip title="Start workout" placement="top" arrow>
              <PlayCircleIcon onClick={()=> handleOnPlayClick(training.id)} sx={{ color: palette.blue, fontSize: 30 }} />
            </Tooltip>
          </ButtonIcon>

          <ButtonIcon>
            <Tooltip title="Edit workout" placement="top" arrow>
              <EditIcon
                color="action"
                sx={{ fontSize: 30 }}
                onClick={handleOnEditClick}
              />
            </Tooltip>
          </ButtonIcon>
          <CommonModal
            openModal={openEditModal}
            children={
              <EditTraining
                allExercise={allExercise}
                training={training} 
                handleRefreshTraining={handleCloseEditModal}
              />
            }
            handleCloseModal={handleCloseEditModal}
          />

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
            <Cell width="65%" align="left">
              Exercise
            </Cell>
            <Cell width="25%" align="left">
              Sets
            </Cell>

            <Cell width="10%" align="left">
              Details
            </Cell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allExercise.map((exercise: Exercise) => (
            <WorkoutsItem exercise={exercise} trainingId={training.id} />
          ))}
        </TableBody>
      </Table>
    </ContainerForTable>
  );
};
export default WorkoutsTable;
