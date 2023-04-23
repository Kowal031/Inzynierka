import {
  Autocomplete,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import ExerciseBase from "../../../types/ExerciseBase";
import styled from "@mui/material/styles/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { palette } from "../../../assets/palette";
import exerciseBaseApi from "../../../api/exerciseBaseApi";
import trainingApi from "../../../api/trainingApi";
import exerciseApi from "../../../api/exerciseApi";
import Exercise from "../../../types/Exercise";

const FormContainer = styled("form")({
  paddingTop: "1rem",
  paddingBottom: "1rem",
  maxHeight: "37.5rem",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  overflow: "auto",
});

const ButtonIcon = styled(IconButton)({
  "&:hover": {
    background: "transparent",
    transform: "scale(1.1)",
  },
});

interface StepWorkoutSetsWeightProps {
  handleRemoveItem: (index: number) => void;
  inputValueExercise: (value: ExerciseBase | null) => void;
  inputValueSet: (valueForSets: number) => void;
  valueForExercise: ExerciseBase | null;
  valueForSets: number;
  formValues: {
    exercise: ExerciseBase | null;
    sets: number | null;
  }[];
  lastTrainingId: number;
  updatedFormValues: (
    formValues: {
      exercise: ExerciseBase | null;
      sets: number | null;
    }[]
  ) => void;
}

const StepWorkoutSetsWeight: FC<StepWorkoutSetsWeightProps> = ({
  handleRemoveItem,
  inputValueExercise,
  inputValueSet,
  valueForSets,
  valueForExercise,
  formValues,
  lastTrainingId,
  updatedFormValues,
}) => {
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase[]>([]);
  const [myExercise, setMyExercise] = useState<Exercise[]>([]);

  useEffect(() => {
    void exerciseBaseApi
      .getAllExerciseBase()
      .then(({ data }) => setExerciseBase(data));
  }, []);

  const getMyExercise = () => {
    void exerciseApi
      .getExerciseByTrainingId(lastTrainingId )
      .then(({ data }) => setMyExercise(data));
  };

  useEffect(() => {
    getMyExercise();
  }, []);

  console.log(typeof lastTrainingId);

  const handleAddExerciseAndWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const id = lastTrainingId ;
    if (valueForExercise !== null && valueForSets !== null) {
      void exerciseApi.addExercise(
        id,
        valueForExercise.name,
        valueForExercise.id,
        valueForSets
      );
    }

  };

  return (
    <>
      <Paper elevation={3}>
        <FormContainer
          sx={{
            marginTop: "1rem",
            padding: "1rem",
          }}
          onSubmit={handleAddExerciseAndWeight}
        >
          <Autocomplete
            id="filter-demo"
            options={exerciseBase}
            getOptionLabel={(exerciseBase) => exerciseBase.name}
            sx={{ width: 300 }}
            value={valueForExercise}
            onChange={(event, value) => inputValueExercise(value)}
            renderInput={(params) => (
              <TextField {...params} label="Choose exercise" />
            )}
          />
          <TextField
            id="outlined-basic"
            label="Choose Sets"
            type="number"
            InputProps={{
              inputProps: {
                min: 1,
              },
            }}
            value={valueForSets}
            onChange={(event) => inputValueSet(parseInt(event.target.value))}
          />
          <Button
            variant="contained"
            sx={{
              border: "1rem",
              borderRadius: "5px",
            }}
            aria-label="fingerprint"
            color="primary"
            type="submit"
          >
            Accept
          </Button>
        </FormContainer>
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
          padding: "1rem",
        }}
      >
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
                {myExercise.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name ? item.name : "N/A"}
                    </TableCell>
                    <TableCell align="right">{item.numberOfSeries}</TableCell>
                    <TableCell align="right">
                      <ButtonIcon onClick={() => handleRemoveItem(index)}>
                        <Tooltip title="Delete workout" placement="top" arrow>
                          <DeleteIcon sx={{ color: palette.error }} />
                        </Tooltip>
                      </ButtonIcon>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default StepWorkoutSetsWeight;
