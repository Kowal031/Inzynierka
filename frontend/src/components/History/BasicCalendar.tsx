import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventContentArg } from "@fullcalendar/core";
import { FC } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SloRenderValueForHistory from "../../utils/SloRenderValueForHistory";
import EventsForCalendar from "../../types/EventsForCalendar";

interface BasicCalendarProps {
  getTrainingValueFromCalendar: (title: string, start: Date | null) => void;
  events: EventsForCalendar[];
}

const BasicCalendar: FC<BasicCalendarProps> = ({
  getTrainingValueFromCalendar,
  events,
}) => {

  console.log(events)
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
  
            getTrainingValueFromCalendar(
              eventInfo.event.title,
              eventInfo.event.start
            );
          }}
        >
          {eventInfo.event.title}
        </Button>
      </>
    );
  };

  return (
    <Box
      sx={{ width: "35vw", padding: "1rem" }}
      component={Paper}
      elevation={3}
    >
      <Typography variant="h5">
        Check your training from the selected day
      </Typography>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        selectable={true}
        dayMaxEvents={5}
      />
    </Box>
  );
};

export default BasicCalendar;
