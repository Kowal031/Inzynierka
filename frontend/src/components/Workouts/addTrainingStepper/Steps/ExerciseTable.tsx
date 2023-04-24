import {
  TableContainer,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { FC } from "react";
import Exercise from "../../../../types/Exercise";
import ExerciseTableBody from "./ExerciseTableBody ";
import styled from "@mui/material/styles/styled";

const CustomBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  padding: "1rem",
});

interface ExerciseTableProps {
  myExercise: Exercise[];
  handleRemoveItem: (id: number) => void;
}

const ExerciseTable: FC<ExerciseTableProps> = ({
  myExercise,
  handleRemoveItem,
}) => {
  return (
    <CustomBox>
      {myExercise.length !== 0 && (
        <TableContainer component={Paper} sx={{ width: "80%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Workout</TableCell>
                <TableCell align="right">Sets</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myExercise.map(({ id, numberOfSeries, name }) => (
                <ExerciseTableBody
                  id={id}
                  numberOfSeries={numberOfSeries}
                  name={name}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </CustomBox>
  );
};

export default ExerciseTable;
