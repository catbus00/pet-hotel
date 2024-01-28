import { User } from "./Types";
import ProfileHeader from "./components/ProfileHeader";

Profile.propTypes = User;

function Profile({ nickname, photo, name }) {
  return (
    <>
      <ProfileHeader src={photo} alt={nickname} caption={name} />
    </>
  );
}

export default Profile;
