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
import trainingApi from "../../../api/trainingApi";
import ExerciseBase from "../../../types/ExerciseBase";
import styled from "@mui/material/styles/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { palette } from "../../../assets/palette";

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

const StepWorkoutSetsWeight: FC = () => {
  const [exerciseBase, setExerciseBase] = useState<ExerciseBase[]>([]);
  const [formValues, setFormValues] = useState<
    Array<{ exercise: ExerciseBase | null; sets: number | null }>
  >([]);
  const [valueForExercise, setValueForExercise] = useState<ExerciseBase | null>(
    null
  );
  const [valueForSets, setValueForSets] = useState<number>(1);

  useEffect(() => {
    void trainingApi
      .getAllExerciseBase()
      .then(({ data }) => setExerciseBase(data));
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valueForExercise !== null && valueForSets !== null) {
      // Access the exercise and sets values from the first element in the array
      // Perform any necessary operations with exercise and sets values

      setFormValues((prevFormValues) => [
        ...prevFormValues,
        { exercise: valueForExercise, sets: valueForSets },
      ]);

      console.log(formValues);

      // Reset the form state
      setValueForExercise(null);
      setValueForSets(0);
    }
  };
  console.log(formValues);

  const handleRemoveItem = (index: number) => {
    setFormValues((prevFormValues) => {
      const updatedFormValues = [...prevFormValues];
      updatedFormValues.splice(index, 1);
      return updatedFormValues;
    });
  };

  return (
    <>
      <Paper elevation={3}>
        <FormContainer
          sx={{
            marginTop: "1rem",
            padding: "1rem",
          }}
          onSubmit={handleFormSubmit}
        >
          <Autocomplete
            id="filter-demo"
            options={exerciseBase}
            getOptionLabel={(exerciseBase) => exerciseBase.name}
            sx={{ width: 300 }}
            value={valueForExercise}
            onChange={(event, value) => setValueForExercise(value)}
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
            onChange={(event) => setValueForSets(parseInt(event.target.value))}
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
        {formValues.length !== 0 && 
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
              {formValues.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.exercise ? item.exercise.name : "N/A"}
                  </TableCell>
                  <TableCell align="right">{item.sets}</TableCell>
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
        }
      </Box>
    </>
  );
};
export default StepWorkoutSetsWeight;
