import HistoryOfWorkouts from "../types/HistoryOfWorkouts";

const getAverageWeightForTrenings = (
  historyOfWorkouts: HistoryOfWorkouts[]
) => {
  const uniqueSet = new Set<Date>(historyOfWorkouts.map((item) => item.date));
  const unique: Date[] = Array.from(uniqueSet);

  console.log(unique);

  const averageWeight: { date: any; average: number, reps: number }[] = [];
  unique.forEach((trainingDate) => {
    const allTrainingByDate = historyOfWorkouts.filter((w) => w.date === trainingDate);
    let weight = 0;
    let reps = 0;
    allTrainingByDate.forEach((el) => {
      weight = weight + el.weight * el.reps;
      reps = reps + el.reps;
    });
    averageWeight.push({ date: trainingDate, average: weight , reps: reps });
  });
  return averageWeight;
};

export default getAverageWeightForTrenings;
