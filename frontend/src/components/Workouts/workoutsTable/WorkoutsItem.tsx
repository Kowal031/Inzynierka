import {
  IconButton,
  styled,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { FC } from "react";
import Exercise from "../../../types/Exercise";
import InfoIcon from "@mui/icons-material/Info";

interface WorkoutsItemProps {
  exercise: Exercise;
  trainingId: number;
  isFromCreator?: boolean;
}
const ButtonIcon = styled(IconButton)({
  "&:hover": {
    background: "transparent",
    transform: "scale(1.1)",
  },
});

const StyledTableRow = styled(TableRow)({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});

const WorkoutsItem: FC<WorkoutsItemProps> = ({ exercise, isFromCreator }) => {
  return (
    <StyledTableRow>
      <TableCell align="left">{exercise.name}</TableCell>
      <TableCell align="left">{exercise.numberOfSeries}</TableCell>
      {isFromCreator !== true && (
        <TableCell align="left">
          <ButtonIcon>
            <Tooltip title="Details" placement="top" arrow>
              <InfoIcon color="action" />
            </Tooltip>
          </ButtonIcon>
        </TableCell>
      )}
    </StyledTableRow>
  );
};

export default WorkoutsItem;
