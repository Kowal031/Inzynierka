import { styled, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { palette } from "../../assets/palette";

interface WorkoutsItemProps {
  aa: string;
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

const WorkoutsItem: FC<WorkoutsItemProps> = ({ aa }) => {
  return (
    <StyledTableRow>
      <TableCell>{aa}</TableCell>
      <TableCell>{aa}</TableCell>
      <TableCell>0</TableCell>
      <TableCell>0</TableCell>
    </StyledTableRow>
  );
};
export default WorkoutsItem;
