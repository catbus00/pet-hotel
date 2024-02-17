import { Alert, Stack, AlertTitle } from "@mui/material";
import PropTypes from "prop-types";

const MuiErrors = ({ severity, title, message }) => {
  return (
    <Stack
      sx={{ width: "100%", marginBottom: "16.5px", marginTop: "16.5px" }}
      spacing={2}
    >
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
};

MuiErrors.propTypes = {
  severity: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MuiErrors;
