import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { palette } from "../../../../assets/palette";
import Exercise from "../../../../types/Exercise";
import WorkoutsItem from "../../workoutsTable/WorkoutsItem";

const ContainerForTable = styled(TableContainer)({
  maxWidth: "34rem",
  background: palette.white,
  boxShadow: "2px 2px 7px 0px rgba(66, 68, 90, 1)",
  margin: "1rem",
});

const ContainerForTabHeader = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const Cell = styled(TableCell)({
  verticalAlign: "bottom",
});
interface StepSubmitWorkoutProps {
  myExercise: Exercise[];
  title: string;
  lastTrainingId: number;
}

const StepSubmitWorkout: FC<StepSubmitWorkoutProps> = ({
  myExercise,
  title,
  lastTrainingId,
}) => {
  return (
    <ContainerForTable>
      <ContainerForTabHeader>
        <Typography sx={{ padding: "1rem" }} variant="h4">
          {title}
        </Typography>
      </ContainerForTabHeader>

      <Table>
        <TableHead>
          <TableRow>
            <Cell width="75%" align="left">
              Exercise
            </Cell>
            <Cell width="25%" align="left">
              Sets
            </Cell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myExercise.map((exercise: Exercise) => (
            <WorkoutsItem
              exercise={exercise}
              trainingId={lastTrainingId}
              isFromCreator={true}
            />
          ))}
        </TableBody>
      </Table>
    </ContainerForTable>
  );
};

export default StepSubmitWorkout;
