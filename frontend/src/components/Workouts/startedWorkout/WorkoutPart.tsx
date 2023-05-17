import { FC, useState } from "react";
import Exercise from "../../../types/Exercise";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Scrollbar } from "react-scrollbars-custom";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const StyledTableRow = styled(TableRow)({
  border: 0,
});

interface WorkoutPartProps {
  exercise: Exercise;
  numberOfExercise: number;
  saveAllValues: (
    exerciseId: number,
    series: number,
    reps: number,
    weights: number
  ) => void;
}

const WorkoutPart: FC<WorkoutPartProps> = ({
  exercise: { id, name, numberOfSeries },
  numberOfExercise,
  saveAllValues,
}) => {
  const series = Array.from({ length: numberOfSeries }, (_, i) => i + 1);
  const [savedSeries, setSavedSeries] = useState(new Set<number>());

  const [reps, setReps] = useState(
    Array.from({ length: numberOfSeries }, () => "")
  );
  const [weights, setWeights] = useState(
    Array.from({ length: numberOfSeries }, () => "")
  );

  const handleSaveSeries = (seriesNumber: number) => {
    setSavedSeries(new Set(savedSeries).add(seriesNumber));
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ borderRadius: "2rem" }}
    >
      <Box sx={{ padding: "1rem 0 1rem 1rem" }}>
        <Typography variant="h5">{`${numberOfExercise}.${name}`}</Typography>
      </Box>
      <TableContainer sx={{ width: "33rem", borderRadius: "2rem" }}>
        <Scrollbar
          style={{ height: "25rem", width: "33rem", background: "white" }}
        >
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow>
                <TableCell align="left">Sets</TableCell>
                <TableCell align="left">Reps</TableCell>
                <TableCell align="left">Weight</TableCell>
                <TableCell align="left">Save</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {series.map((s, index) => (
                <TableRow
                  key={s}
                  sx={{
                    backgroundColor: savedSeries.has(s)
                      ? "#74c365"
                      : "transparent",
                  }}
                >
                  <TableCell>
                    <Typography>#{s}</Typography>
                  </TableCell>
                  <TableCell>
                    {savedSeries.has(s) ? (
                      <Typography>{`${reps[index]} reps`}</Typography>
                    ) : (
                      <TextField
                        label={`Reps`}
                        type="number"
                        value={reps[index]}
                        onChange={(event) => {
                          const newReps = [...reps];
                          newReps[index] = event.target.value;
                          setReps(newReps);
                        }}
                        InputProps={{
                          inputProps: { min: 1, max: 999 },
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {savedSeries.has(s) ? (
                      <Typography>{`${weights[index]}kg`}</Typography>
                    ) : (
                      <TextField
                        label={`Weight`}
                        type="number"
                        value={weights[index]}
                        onChange={(event) => {
                          const newWeights = [...weights];
                          newWeights[index] = event.target.value;
                          setWeights(newWeights);
                        }}
                        InputProps={{
                          inputProps: { min: 0.1, max: 999 },
                          endAdornment: (
                            <InputAdornment position="end">kg</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {savedSeries.has(s) ? (
                      <IconButton disabled>
                        <TaskAltIcon color="success" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          saveAllValues(
                            id,
                            s,
                            parseInt(reps[index]),
                            parseInt(weights[index])
                          );
                          handleSaveSeries(s);
                        }}
                      >
                        <Tooltip title="Save series" placement="top" arrow>
                          <SaveIcon color="info" />
                        </Tooltip>
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Box>
  );
};

export default WorkoutPart;
