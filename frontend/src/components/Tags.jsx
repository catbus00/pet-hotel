import { Box, Chip, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Tags = ({ tags, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <Typography variant="h4" fontFamily="BeautifulBarbies" sx={{ pr: 6 }}>
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
