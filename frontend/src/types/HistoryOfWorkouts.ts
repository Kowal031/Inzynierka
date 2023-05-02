interface HistoryOfWorkouts {
  id?: number;
  idExercise: number;
  reps: number;
  weight: number;
  trainingId: number;
  trainingTitle: string;
  date: Date;
  idBaseExercise: number;
  exerciseName: string;
}

export default HistoryOfWorkouts;
