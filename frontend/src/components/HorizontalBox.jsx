import { Box } from "@mui/material";
import PropTypes from "prop-types";

const HorizontalBox = (props) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }}
    {...props}
  />
);
HorizontalBox.muiName = "Box";
HorizontalBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
};

export default HorizontalBox;
