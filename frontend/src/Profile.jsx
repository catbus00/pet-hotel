import { Box } from "@mui/material";
import ProfileHeader from "./components/ProfileHeader";
import Tags from "./components/Tags";
import VerticalBox from "./components/VerticalBox";
import { Authenticated } from "./types/Authentication";
import { Typography, Avatar } from "@mui/material";

Profile.propTypes = {
  ...Authenticated,
};
// const KOKO = {
//   nickname: "Koko",
//   name: 'Koko "Kondo" Eugene Smithianan',
//   photo: "/photos/koko.jpg",
//   likes: ["entrepreneurship", "following Mom", "gin khao"],
//   dislikes: [
//     "uncleanliness",
//     "lack of food",
//     "not being allowed outside",
//     "lack of attention",
//   ],
//   species: "cat",
//   gender: "male",
//   role: true, //owner
// };
// const KOA = {
//   nickname: "Koa",
//   name: 'Koa "Wawa" Milton Smithianan',
//   photo: "/photos/koa.jpg",
//   likes: ["belly rubbing", "sunshine", "string toys"],
//   dislikes: ["no playing", "farting", "sneezing"],
//   species: "cat",
//   gender: "male",
//   role: false, //customer
// };
// const Users = [KOKO, KOA];

function Profile({ user }) {
  return (
    <>
      <Box
        sx={{
          marginBottom: "100px",
          marginTop: "100px",
          borderRadius: "30px",
        }}
      >
        <Typography gutterBottom variant="h6">
          <ul>
            <Typography
              gutterBottom
              variant="h3"
              fontFamily="BeautifulBarbies"
              sx={{ mx: "auto" }}
            >
              Profile
            </Typography>
            <Avatar sx={{ width: 128, height: 128, mr: 4, mx: "auto" }}>
              <img
                src="../public/photos/koko.jpg"
                alt="Koko"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  alignItems: "center",
                }}
              />
            </Avatar>
            <ul>{user.name}</ul>
            <ul>{user.email}</ul>
          </ul>
        </Typography>
      </Box>
    </>
  );
}

export default Profile;
