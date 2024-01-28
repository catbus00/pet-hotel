import { User } from "./Types";
import ProfileHeader from "./components/ProfileHeader";
import Tags from "./components/Tags";

Profile.propTypes = User;

function Profile({ nickname, photo, name, likes, dislikes, gender, specie }) {
  return (
    <>
      <ProfileHeader
        src={photo}
        alt={nickname}
        caption={name}
        gender={gender}
        specie={specie}
      />
      <Tags label="Likes" tags={likes} />
      <Tags label="Dislikes" tags={dislikes} />
    </>
  );
}

export default Profile;
