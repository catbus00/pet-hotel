import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

InputSelect.propTypes = {
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};
function InputSelect({ control, label, name, items }) {
  return (
    <>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              {...field}
              id={name}
              sx={{ width: "195px", marginBottom: "16.5px" }}
            >
              {items.map(({ key, value }) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </>
  );
}

export default InputSelect;
