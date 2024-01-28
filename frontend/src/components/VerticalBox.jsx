import { Box } from "@mui/material";
import PropTypes from "prop-types";

const VerticalBox = (props) => (
  <Box
    sx={{
      flexDirection: "column",
      alignItems: "flex-start",
      display: "inline-flex",
    }}
    {...props}
  />
);
VerticalBox.muiName = "Box";
VerticalBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
};

export default VerticalBox;
