import { styled, TableCell, TableRow } from "@mui/material";
import { FC, useEffect } from "react";
import exerciseApi from "../../api/exerciseApi";
import { palette } from "../../assets/palette";
import Exercise from "../../types/Exercise";

interface WorkoutsItemProps {
  exercise: Exercise;
}
const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(even)": {
    backgroundColor: palette.tableRowBackground,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

const WorkoutsItem: FC<WorkoutsItemProps> = ({ exercise }) => {

  return (
    <StyledTableRow>
      <TableCell>{exercise.name}</TableCell>
      <TableCell>{exercise.numberOfSeries}</TableCell>
      <TableCell>0</TableCell>
      <TableCell>0</TableCell>
    </StyledTableRow>
  );
};
export default WorkoutsItem;
