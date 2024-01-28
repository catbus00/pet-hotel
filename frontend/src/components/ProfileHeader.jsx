import { Typography, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import HumanIcon from "./HumanIcon";
import CatIcon from "./CatIcon";
import DogIcon from "./DogIcon";
import FemaleIcon from "./FemaleIcon";
import MaleIcon from "./MaleIcon";
import HorizontalBox from "./HorizontalBox";
import VerticalBox from "./VerticalBox";

ProfileHeader.propTypes = {
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  src: PropTypes.string,
  gender: PropTypes.oneOf(["male", "female"]),
};

function ProfileHeader({ alt, src, caption, gender, specie }) {
  return (
    <>
      <HorizontalBox>
        <Avatar alt={alt} src={src} sx={{ width: 128, height: 128, mr: 4 }}>
          {alt.length > 0 ? alt.charAt(0) : "-"}
        </Avatar>
        <VerticalBox>
          <HorizontalBox>
            <Typography sx={{ ml: 2 }} variant="subtitle1">
              {caption}
            </Typography>
          </HorizontalBox>
          <HorizontalBox>
            <Typography variant="h2" fontFamily="BeautifulBarbies">
              {alt}
            </Typography>
            {specie === "human" ? (
              <HumanIcon /> ? (
                specie === "cat"
              ) : (
                <CatIcon />
              )
            ) : (
              <DogIcon />
            )}
            {gender === "female" ? <FemaleIcon /> : <MaleIcon />}
          </HorizontalBox>
        </VerticalBox>
      </HorizontalBox>
    </>
  );
}

export default ProfileHeader;
