import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";

function InputDatePicker({ control }) {
  const today = dayjs();
  return (
    <Controller
      name="year"
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            views={["year"]}
            label="Year Founded"
            maxDate={today}
            value={value || null}
            inputRef={ref}
            onChange={(date) => {
              onChange(date);
            }}
            sx={{ marginBottom: "16.5px" }}
          />
        </LocalizationProvider>
      )}
    />
  );
}

InputDatePicker.propTypes = {
  control: PropTypes.object.isRequired,
};

export default InputDatePicker;
