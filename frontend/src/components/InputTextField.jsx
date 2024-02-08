import { Typography, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

InputTextField.propTypes = {
  control: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rules: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

function InputTextField({ control, error, rules, label, name, placeholder }) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            id={name}
            placeholder={placeholder}
            error={Boolean(error)}
          />
        )}
      ></Controller>
      <Typography>{error?.message}</Typography>
    </>
  );
}

export default InputTextField;
