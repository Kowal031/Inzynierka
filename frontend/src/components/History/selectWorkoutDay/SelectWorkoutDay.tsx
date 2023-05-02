import { Box } from "@mui/system";
import { FC } from "react";
import HistoryOfWorkouts from "../../../types/HistoryOfWorkouts";
import BasicCalendar from "../BasicCalendar";

interface SelectWorkoutDayProps{
    history: HistoryOfWorkouts[];
}


const SelectWorkoutDay: FC<SelectWorkoutDayProps> = () => {
  return (
    <Box>
      <BasicCalendar />
    </Box>
  );
};
export default SelectWorkoutDay;
