import { Box } from "@mui/material";
import PropTypes from "prop-types";

const VerticalBox = (props) => (
  <Box
    sx={{
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",      
    }}
    {...props}
  />
);
VerticalBox.muiName = "Box";
VerticalBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
};

export default VerticalBox;
