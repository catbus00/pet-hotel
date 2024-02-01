import { Pet } from "./types/Pet";
import ProfileHeader from "./components/ProfileHeader";
import Tags from "./components/Tags";

Profile.propTypes = Pet;

function Profile({ nickname, photo, name, likes, dislikes, gender, species }) {
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
    </>
  );
}

export default Profile;
