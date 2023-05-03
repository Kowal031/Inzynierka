import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { FC, useState } from "react";
import HistoryOfWorkouts from "../../../types/HistoryOfWorkouts";
import CommonDateRangePicker from "./CommonDateRangePicker";


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
}

const WorkoutHistoryTable: FC<WorkoutHistoryTableProps> = ({ workouts }) => {
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
    const { date, trainingTitle, idExercise, reps, weight, exerciseName } = workout;
    const key = `${date}_${trainingTitle}`;
    if (!groupedWorkouts[key]) {
      groupedWorkouts[key] = {};
    }
    if (!groupedWorkouts[key][idExercise]) {
      groupedWorkouts[key][idExercise] = {
        idExercise,
        exerciseName,
        series: []
      };
    }
    groupedWorkouts[key][idExercise].series.push({ reps, weight });
  }

  // create a table row for each series of each grouped workout
  const rows = [];
  for (const key of Object.keys(groupedWorkouts)) {
    const { id, date, trainingTitle } = workouts.find(w => `${w.date}_${w.trainingTitle}` === key)!;
    rows.push(
      <TableRow key={`title_${key}`}>
        <TableCell colSpan={5}>{`${trainingTitle} - ${new Date(date).toLocaleDateString()}`}</TableCell>
      </TableRow>
    );
    rows.push(
      <TableRow key="header">
        <TableCell>Exercise Name</TableCell>
        <TableCell>Series</TableCell>
        <TableCell>Reps</TableCell>
        <TableCell>Weight</TableCell>
      </TableRow>
    );
    for (const idExercise of Object.keys(groupedWorkouts[key])) {
      const { exerciseName, series } = groupedWorkouts[key][idExercise];
      rows.push(
        <TableRow key={`${key}_${idExercise}`}>
          <TableCell>{exerciseName}</TableCell>
          <TableCell>{series.length}</TableCell>
          <TableCell>{series.map(s => s.reps).join(' / ')}</TableCell>
          <TableCell>{series.map(s => s.weight).join(' / ')}</TableCell>
        </TableRow>
      );
    }
  }

  return (
    <Box>
      <CommonDateRangePicker
        startDate={startDate}
        handleEndDateChange={handleEndDateChange}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
      />
      <Table>
        <TableHead>{rows[0]}</TableHead>
        <TableBody>{rows.slice(1)}</TableBody>
      </Table>
    </Box>
  );
}

export default WorkoutHistoryTable;