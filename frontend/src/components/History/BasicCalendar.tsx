import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventContentArg } from "@fullcalendar/core";
import { FC } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface EventsForCalendar {
  title: string;
  start: Date;
}

const BasicCalendar: FC = () => {
  const events: EventsForCalendar[] = [
    { title: "Pompa Klaty", start: new Date() },
  ];

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        {/* <b>{eventInfo.timeText}</b> */}
        <Button size="small" variant="contained">
          {eventInfo.event.title}
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ width: "35vw", padding:"1rem" }} component={Paper} elevation={3}>
      <Typography variant="h5">Check your training from the selected day</Typography>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        selectable={true}
        dayMaxEvents={true}
      />
    </Box>
  );
};

export default BasicCalendar;
