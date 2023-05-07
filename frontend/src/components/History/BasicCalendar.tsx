import { Box } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventContentArg, sliceEvents } from "@fullcalendar/core";
import { FC, Fragment } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SloRenderValueForHistory from "../../utils/SloRenderValueForHistory";
import EventsForCalendar from "../../types/EventsForCalendar";
import styled from "styled-components";
import React from "react";

interface BasicCalendarProps {
  getTrainingValueFromCalendar: (title: string, start: Date | null) => void;
  events: EventsForCalendar[];
}

const BasicCalendar: FC<BasicCalendarProps> = ({
  getTrainingValueFromCalendar,
  events,
}) => {




  const renderEventContent = (eventInfo: EventContentArg) => {

    return (
      <>
        <Button
        style={{fontSize: "12px", whiteSpace:"break-spaces", textTransform: "none" }}
        fullWidth
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
  const customHeaderToolbar = {
    left: "title",
    center: "",
    right: "prev,next today",
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
      <StyleWrapper>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          selectable={true}
          dayMaxEvents={0}
          headerToolbar={customHeaderToolbar}
          themeSystem="bootstrap"
         moreLinkText={n => ` +${n} workouts`}
          
        />
      </StyleWrapper>
    </Box>
  );
};

export default BasicCalendar;
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button,
  .fc-button.fc-button-primary {
    background: #3788d8;
    background-image: none;
    font-family: "Helvetica";
    border: none;
    box-shadow: none;
    :disabled {
      opacity: 1;
      cursor: pointer;
      border: none;
    }
    :active, :focus, :hover, :after, :before{
      background: #005fbf;
      borderColor: transparent transparent transparent
      border: none;
      box-shadow: none;
    }


  }
  .fc-toolbar-title{
    font-family: "Helvetica";
    font-weight: 600;
  }
  .fc-today-bg-color{
    background-color: gray 
  }
  .fc-daygrid-day-bottom{
    background-color: #3788d8;
    font-family: "Helvetica";
    border-radius: 8px;
    color: white;


  }

`;
