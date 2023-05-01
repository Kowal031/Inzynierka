import { Box, Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import exerciseApi from "../../../api/exerciseApi";
import seriesAndRepsApi from "../../../api/seriesAndRepsApi";
import Exercise from "../../../types/Exercise";
import SeriesAndReps from "../../../types/SeriesAndReps";
import WorkoutPart from "./WorkoutPart";

const StartWorkout: FC = () => {
  const { workoutId } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>();
  const [allValues, setAllValues] = useState<SeriesAndReps[]>();

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

  useEffect(() => {
    void exerciseApi
      .getExerciseByTrainingId(parseInt(workoutId ?? ""))
      .then(({ data }) => {
        setExercises(data);
      });
  }, []);

  const getWorkoutSeriesAndWeights = () => {
    if (allValues !== undefined)
      void seriesAndRepsApi.updateSeriesAndWeight(allValues);
  };
  console.log(allValues);
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
      <Button onClick={getWorkoutSeriesAndWeights} variant="contained">Finish Training</Button>
    </Box>
  );
};

export default StartWorkout;
