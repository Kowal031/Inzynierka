import trainingApi from "../api/trainingApi";

const getTrainingId = async (): Promise<number> => {
  try {
    const { data } = await trainingApi.getAllTrainings();
    const lastId = data.length > 0 ? Math.max(...data.map(({ id }) => id)) : 0;
    return lastId + 1;
  } catch (error) {
    console.error("Error while getting trainings: ", error);
    return 0;
  }
};

export default getTrainingId;