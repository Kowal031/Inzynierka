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
console.log(reps[0])
  return (
    <Box component={Paper} elevation={3}>
      <Box sx={{ padding: "1rem 0 1rem 1rem" }}>
        <Typography variant="h5">{`${numberOfExercise}.${name}`}</Typography>
      </Box>
      <TableContainer sx={{ width: "33rem" }}>
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
                        disabled={index === 0 ? false : reps[index - 1] === "" ?  true : savedSeries.has(s - 1) ?  false : true  } // dodać że jak 1 element to nie
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
                    disabled={index === 0 ? false : weights[index - 1] === "" ?  true : savedSeries.has(s - 1) ?  false : true }
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
                      <>saved</>
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
                          <TaskAltIcon color="success" />
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
