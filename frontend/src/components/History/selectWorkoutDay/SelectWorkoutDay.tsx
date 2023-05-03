import { Box } from "@mui/system";
import { FC, useState, useEffect } from "react";
import EventsForCalendar from "../../../types/EventsForCalendar";
import HistoryOfWorkouts from "../../../types/HistoryOfWorkouts";
import SloRenderValueForHistory from "../../../utils/SloRenderValueForHistory";
import BasicCalendar from "../BasicCalendar";

interface SelectWorkoutDayProps {
  historyOfWorkouts: HistoryOfWorkouts[];

  getTrainingValueFromCalendar: (title: string, start: Date | null) => void;
}

const SelectWorkoutDay: FC<SelectWorkoutDayProps> = ({
  historyOfWorkouts,

  getTrainingValueFromCalendar,
}) => {
  const [events, setEvents] = useState<EventsForCalendar[]>([]);

  useEffect(() => {
    const uniqueEventsSet = historyOfWorkouts.reduce<EventsForCalendar[]>(
      (acc, workout) => {
        const event = {
          title: workout.trainingTitle,
          start: new Date(workout.date),
        };
        if (!acc.some((e) => e.title === event.title)) {
          acc.push(event);
        }
        return acc;
      },
      []
    );
    setEvents(uniqueEventsSet ?? []);
  }, [historyOfWorkouts]);

  console.log(events)

  return (
    <Box>
      <BasicCalendar
        getTrainingValueFromCalendar={getTrainingValueFromCalendar}
        events={events}
      />
    </Box>
  );
};

export default SelectWorkoutDay;
