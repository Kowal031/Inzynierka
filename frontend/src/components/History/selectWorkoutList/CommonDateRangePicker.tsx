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
    </div>
  );
};

export default CommonDateRangePicker;
