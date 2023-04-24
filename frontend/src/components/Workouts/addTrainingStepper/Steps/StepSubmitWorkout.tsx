import {
  Box,
  // TableContainer,
  // Paper,
  // Table,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableBody,
} from "@mui/material";
import { FC } from "react";
// import ExerciseBase from "../../../types/ExerciseBase";

interface StepSubmitWorkoutProps {

}

const StepSubmitWorkout: FC<StepSubmitWorkoutProps> = ({}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        padding: "1rem",
      }}
    >
      {/* {formValues.length !== 0 && (
        <TableContainer component={Paper} sx={{ width: "80%" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <Box>Title</Box>
              </TableRow>
              <TableRow>
                <TableCell>Workout</TableCell>
                <TableCell align="right">Sets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formValues.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.exercise ? item.exercise.name : "N/A"}
                  </TableCell>
                  <TableCell align="right">{item.sets}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )} */}
    </Box>
  );
};

export default StepSubmitWorkout;
