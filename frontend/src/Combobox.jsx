import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

Combobox.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  hotels: PropTypes.arrayOf(PropTypes.object),
  rules: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

function Combobox({ control, name, hotels, rules, error }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        // 'value' is intentionally ignored (issue controlled/uncontrolled)
        const { value, onChange, ...restricted } = field;
        return (
          <Autocomplete
            {...restricted}
            disablePortal
            options={hotels}
            id={`${name}-autocomplete`}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(error)}
                helperText={error?.message}
                label="Choose your Pet's Hotel"
              />
            )}
            onChange={(_, v) => onChange(v)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        );
      }}
    />
  );
}

export default Combobox;
