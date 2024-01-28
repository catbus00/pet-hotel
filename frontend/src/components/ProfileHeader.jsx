import { Typography, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import CatIcon from "../assets/svg/cat.svg?react";
import HorizontalBox from "./HorizontalBox";
import VerticalBox from "./VerticalBox";

ProfileHeader.propTypes = {
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  src: PropTypes.string,
};

function ProfileHeader({ alt, src, caption }) {
  return (
    <>
      <HorizontalBox>
        <Avatar alt={alt} src={src} sx={{ width: 128, height: 128, mr: 4 }}>
          {alt.length > 0 ? alt.charAt(0) : "-"}
        </Avatar>
        <VerticalBox>
          <HorizontalBox>
            <CatIcon />
            <Typography variant="subtitle1">{caption}</Typography>
          </HorizontalBox>
          <Typography variant="h2" fontFamily="BeautifulBarbies">
            {alt}
          </Typography>
        </VerticalBox>
      </HorizontalBox>
    </>
  );
}

export default ProfileHeader;
