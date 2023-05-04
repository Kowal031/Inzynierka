import { Box, Button, Grid, TextField, TextFieldProps } from "@mui/material";
import React, { forwardRef, useState } from "react";
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
    wrapperClassName: "date-picker-wrapper",
    dateFormat: "dd/MM/yyyy",
  };

  const endDatePickerProps: ReactDatePickerProps = {
    selected: endDate,
    onChange: handleEndDateChange,
    selectsEnd: true,
    startDate: startDate,
    endDate: endDate,
    minDate: startDate,
    placeholderText: "End Date",
    wrapperClassName: "date-picker-wrapper",
    dateFormat: "dd/MM/yyyy",
  };
// changeit
//   const ExampleCustomInput = forwardRef<
//   HTMLDivElement | null,
//   TextFieldProps 
// >(({ value, onClick }, ref) => (
//   <div className="example-custom-input" onClick={onClick} ref={ref}>
//     {value}
//   </div>
// ));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "8px",
      }}
    >
      <DatePicker
        {...datePickerProps}
        wrapperClassName="date-picker-wrapper"
        className="date-picker"
        
      />
      <DatePicker
        {...endDatePickerProps}
        wrapperClassName="date-picker-wrapper"
        className="date-picker"
        // customInput={<ExampleCustomInput />}
      />
      <Button
        size="small"
        variant="contained"
        onClick={handleReset}
        sx={{ backgroundColor: "primary.main", color: "white" }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default CommonDateRangePicker;