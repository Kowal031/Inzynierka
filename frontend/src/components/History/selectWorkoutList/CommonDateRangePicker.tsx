import { Button } from "@mui/material";
import React, { useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CommonDateRangePickerProps {
  startDate: Date | null;
  handleStartDateChange: (date: Date | null) => void;
  endDate: Date | null;
  handleEndDateChange: (date: Date | null) => void;
}

const CommonDateRangePicker: React.FC<CommonDateRangePickerProps> = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
}) => {
  const handleReset = () => {
    handleStartDateChange(null);
    handleEndDateChange(null);
  };

  const datePickerProps: ReactDatePickerProps = {
    selected: startDate,
    onChange: handleStartDateChange,
    selectsStart: true,
    startDate: startDate,
    endDate: endDate,
    placeholderText: "Start Date",
  };

  const endDatePickerProps: ReactDatePickerProps = {
    selected: endDate,
    onChange: handleEndDateChange,
    selectsEnd: true,
    startDate: startDate,
    endDate: endDate,
    minDate: startDate,
    placeholderText: "End Date",
  };

  return (
    <div>
      <DatePicker {...datePickerProps} />
      <DatePicker {...endDatePickerProps} />
      <Button size="small" variant="contained" onClick={handleReset}>Reset filter</Button>
    </div>
  );
};

export default CommonDateRangePicker;
