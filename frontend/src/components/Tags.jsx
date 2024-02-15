import { Box, Chip, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Tags = ({ tags, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    }}
  >
    <Typography fontFamily="BeautifulBarbies" sx={{ pr: 7, fontSize: "25px" }}>
      {label}
    </Typography>
    {tags.map((tag, index) => (
      <Chip label={tag} key={tag + index} sx={{ mr: 1 }} />
    ))}
  </Box>
);
Tags.muiName = "Box";
Tags.propTypes = {
  label: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
