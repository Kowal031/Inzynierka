const training = "api/Training";
const exerciseBase = "api/ExerciseBase";
const exercise = "api/Exercise";
const seriesaAndReps = "api/SeriesAndReps";
const history = "api/History";
const byTrainingId = "/ByTrainingId";
const byExerciseId = "/ByExerciseId";
const register = "api/Users/register";
const login = "api/Users/login";
const baseURL = process.env.REACT_APP_API_BASE_URL

const endpoints = {
  training,
  baseURL,
  exercise,
  byTrainingId,
  byExerciseId,
  history,
  exerciseBase,
  seriesaAndReps,
  register,
  login
};
export default endpoints;
