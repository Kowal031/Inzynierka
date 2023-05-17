import { Box, Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import exerciseApi from "../../../api/exerciseApi";
import seriesAndRepsApi from "../../../api/seriesAndRepsApi";
import Exercise from "../../../types/Exercise";
import SeriesAndReps from "../../../types/SeriesAndReps";
import CustomSnackbar from "../../common/CommonSnackbar";
import WorkoutPart from "./WorkoutPart";

const StartWorkout: FC = () => {
  const { workoutId } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>();
  const [allValues, setAllValues] = useState<SeriesAndReps[]>();
  const navigate = useNavigate();
  const saveAllValues = (
    exerciseId: number,
    series: number,
    reps: number,
    weights: number
  ) => {
    const allValues = {
      idExercise: exerciseId,
      seriesNumber: series,
      reps: reps,
      weight: weights,
    };

    setAllValues((prevValues) => [...(prevValues ?? []), allValues]);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");

  const handleOpenSnackBar = (succesfull: boolean, message: string) => {
    if (succesfull) {
      setMessage(message);
      setSeverity("success");
    } else {
      setMessage(message);
      setSeverity("error");
    }
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  useEffect(() => {
    void exerciseApi
      .getExerciseByTrainingId(parseInt(workoutId ?? ""))
      .then(({ data }) => {
        setExercises(data);
      });
  }, [workoutId]);

  const getWorkoutSeriesAndWeights = () => {
    if (allValues !== undefined)
      void seriesAndRepsApi.updateSeriesAndWeight(allValues).then(() => {
        handleOpenSnackBar(true,"Your training has been saved successfully")
        
      }).then(() => {
        setTimeout(() => {
          navigate("/workouts")
        },2000);
        
      })
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "6rem",
          marginTop: "2rem",
          flexWrap: "wrap",
        }}
      >
        {exercises?.map((exercise, index) => (
          <WorkoutPart
            exercise={exercise}
            key={index}
            numberOfExercise={index + 1}
            saveAllValues={saveAllValues}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ margin: "1rem", width: "40vw" }}
          onClick={getWorkoutSeriesAndWeights}
          variant="contained"
          size="large"
        >
          Finish Training
        </Button>
      </Box>
      <CustomSnackbar
          handleClose={handleClose}
          open={open}
          message={message}
          severity={severity}
        />
    </Box>
  );
};

export default StartWorkout;
