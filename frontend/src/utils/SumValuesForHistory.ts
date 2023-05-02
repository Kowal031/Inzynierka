import HistoryOfWorkouts from "../types/HistoryOfWorkouts";

function sumValuesForHistory(historyOfWorkouts: HistoryOfWorkouts[]): HistoryOfWorkouts[] {
    const sums: { [key: string]: HistoryOfWorkouts } = {};
    for (const workout of historyOfWorkouts) {
      const key = `${workout.idExercise}_${workout.trainingId}_${workout.date}`;
      if (!(key in sums)) {
        sums[key] = {
          idExercise: workout.idExercise,
          trainingId: workout.trainingId,
          date: workout.date,
          reps: 0,
          weight: 0,
          trainingTitle: workout.trainingTitle,
          idBaseExercise: workout.idBaseExercise,
          exerciseName: workout.exerciseName,
        };
      }
      sums[key].reps += workout.reps;
      sums[key].weight += workout.weight;
    }
  
    const result = Object.values(sums).map((sum) => ({
      ...sum,
      reps: Math.round(sum.reps / historyOfWorkouts.filter((h) => h.idExercise === sum.idExercise && h.trainingId === sum.trainingId && h.date === sum.date).length),
      weight: Math.round(sum.weight / historyOfWorkouts.filter((h) => h.idExercise === sum.idExercise && h.trainingId === sum.trainingId && h.date === sum.date).length),
    }));
  
    return result;
  }

  export default sumValuesForHistory