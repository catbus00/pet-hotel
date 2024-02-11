import { Pet } from "./types/Pet";
import ProfileHeader from "./components/ProfileHeader";
import Tags from "./components/Tags";
import Navigation from "./Navigation";

const KOKO = {
  nickname: "Koko",
  name: 'Koko "Kondo" Eugene Smithianan',
  photo: "/photos/koko.jpg",
  likes: ["entrepreneurship", "following Mom", "gin khao"],
  dislikes: [
    "uncleanliness",
    "lack of food",
    "not being allowed outside",
    "lack of attention",
  ],
  species: "cat",
  gender: "male",
  role: true, //owner
};
const KOA = {
  nickname: "Koa",
  name: 'Koa "Wawa" Milton Smithianan',
  photo: "/photos/koa.jpg",
  likes: ["belly rubbing", "sunshine", "string toys"],
  dislikes: ["no playing", "farting", "sneezing"],
  species: "cat",
  gender: "male",
  role: false, //customer
};

const Users = [KOKO, KOA];

function Profile() {
  const { photo, nickname, name, gender, species, likes, dislikes } = KOKO;
  return (
    <>
      <ProfileHeader
        src={photo}
        alt={nickname}
        caption={name}
        gender={gender}
        species={species}
      />
      <Tags label="Likes" tags={likes} />
      <Tags label="Dislikes" tags={dislikes} />
      <Navigation />
    </>
  );
}

export default Profile;
