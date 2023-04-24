import {
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  styled,
} from "@mui/material";
import { FC } from "react";
import { palette } from "../../../../assets/palette";
import DeleteIcon from "@mui/icons-material/Delete";

const ButtonIcon = styled(IconButton)({
  "&:hover": {
    background: "transparent",
    transform: "scale(1.1)",
  },
});

interface ExerciseTableBodyProps {
  id: number;
  numberOfSeries: number;
  name: string;
  handleRemoveItem: (id: number) => void;
}

const ExerciseTableBody: FC<ExerciseTableBodyProps> = ({
  id,
  numberOfSeries,
  name,
  handleRemoveItem,
}) => {
  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">
        {name ? name : "N/A"}
      </TableCell>
      <TableCell align="right">{numberOfSeries}</TableCell>
      <TableCell align="right">
        <ButtonIcon onClick={() => handleRemoveItem(id)}>
          <Tooltip title="Delete workout" placement="top" arrow>
            <DeleteIcon sx={{ color: palette.error }} />
          </Tooltip>
        </ButtonIcon>
      </TableCell>
    </TableRow>
  );
};

export default ExerciseTableBody;
