import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  styled,
} from "@mui/material";
import { FC, useState } from "react";
import HistoryOfWorkouts from "../../../types/HistoryOfWorkouts";
import HistoryChart from "../HistoryChart";
import CommonDateRangePicker from "./CommonDateRangePicker";

const BoldTableCell = styled(TableCell)({
  fontWeight: "bold",
});

const TitleTableCell = styled(TableCell)({
  background: "#1976d2",
  color: "white",
  fontWeight: "500",
});

interface GroupedWorkout {
  idExercise: number;
  exerciseName: string;
  series: {
    reps: number;
    weight: number;
  }[];
}

interface WorkoutHistoryTableProps {
  workouts: HistoryOfWorkouts[];
  averageWeight: {
    date: any;
    average: number;
    reps: number;
}[]
}

const WorkoutHistoryTable: FC<WorkoutHistoryTableProps> = ({ workouts, averageWeight }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const filterWorkoutsByDate = (workouts: HistoryOfWorkouts[]) => {
    if (!startDate || !endDate) {
      return workouts;
    }
    return workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startDate && workoutDate <= endDate;
    });
  };

  // group the workouts by date and trainingTitle, and then by idExercise
  const groupedWorkouts: Record<string, Record<string, GroupedWorkout>> = {};
  for (const workout of filterWorkoutsByDate(workouts)) {
    const { date, trainingTitle, idExercise, reps, weight, exerciseName } =
      workout;
    const key = `${date}_${trainingTitle}`;
    if (!groupedWorkouts[key]) {
      groupedWorkouts[key] = {};
    }
    if (!groupedWorkouts[key][idExercise]) {
      groupedWorkouts[key][idExercise] = {
        idExercise,
        exerciseName,
        series: [],
      };
    }
    groupedWorkouts[key][idExercise].series.push({ reps, weight });
  }

  // create a table row for each series of each grouped workout
  const rows = [];
  for (const key of Object.keys(groupedWorkouts)) {
    const { id, date, trainingTitle, idExercise } = workouts.find(
      (w) => `${w.date}_${w.trainingTitle}` === key
    )!;
    rows.push(
      <TableRow key={`title_${key}`}>
        <TitleTableCell colSpan={5}>{`${trainingTitle} - ${new Date(
          date
        ).toLocaleDateString()}`}</TitleTableCell>
      </TableRow>
    );
    if (idExercise) {
      rows.push(
        <TableRow key={`header_${key}`}>
          <BoldTableCell>Exercise Name</BoldTableCell>
          <BoldTableCell>Series</BoldTableCell>
          <BoldTableCell>Reps</BoldTableCell>
          <BoldTableCell>Weight</BoldTableCell>
        </TableRow>
      );
    }
    for (const idExercise of Object.keys(groupedWorkouts[key])) {
      const { exerciseName, series } = groupedWorkouts[key][idExercise];
      rows.push(
        <TableRow key={`${key}_${idExercise}`}>
          <TableCell>{exerciseName}</TableCell>
          <TableCell>{series.length}</TableCell>
          <TableCell>{series.map((s) => s.reps).join(" / ")}</TableCell>
          <TableCell>{series.map((s) => s.weight).join(" / ")}</TableCell>
        </TableRow>
      );
    }
  }

  return (
    <Box>
      {workouts.length > 0 ? (
        <>
          <CommonDateRangePicker
            startDate={startDate}
            handleEndDateChange={handleEndDateChange}
            endDate={endDate}
            handleStartDateChange={handleStartDateChange}
          />
          <Table>
            <TableHead>{rows[0]}</TableHead>
            <TableBody>{rows.slice(1)}</TableBody>
          </Table>{" "}
        </>
      ) : (
        <HistoryChart averageWeight={averageWeight} />
      )}
    </Box>
  );
};

export default WorkoutHistoryTable;
