import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FC } from 'react';
import HistoryOfWorkouts from '../../../types/HistoryOfWorkouts';

interface WorkoutHistoryTableProps{
    workouts: HistoryOfWorkouts[]
}

const WorkoutHistoryTable: FC<WorkoutHistoryTableProps> = ({workouts}) => {

    const rows = [];
    const seen = new Set();
    
    // iterate over the summedValues array and create a table row for each unique combination of date, trainingId, and idExercise
    for (const workout of workouts) {
      const { date, trainingId, idExercise, reps, weight } = workout;
      const key = `${date}_${trainingId}_${idExercise}`;
      
      if (!seen.has(key)) {
        seen.add(key);
        rows.push(
          <TableRow key={key}>
            <TableCell>{new Date(workout.date).toLocaleDateString()}</TableCell>
            <TableCell>{trainingId}</TableCell>
            <TableCell>{idExercise}</TableCell>
            <TableCell>{reps}</TableCell>
            <TableCell>{weight}</TableCell>
          </TableRow>
        );
      }
    }
    
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Training ID</TableCell>
            <TableCell>Exercise ID</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    );
  }

export default WorkoutHistoryTable
