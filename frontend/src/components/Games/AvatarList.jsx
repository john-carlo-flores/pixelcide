import Avatar from "./Avatar";

import styles from "../../styles/Games/AvatarList.module.scss";

const AvatarList = (props) => {
  const { avatars } = props;
  const avatarList = avatars.map((avatar) => {
    return <Avatar key={avatar} id={avatar} />;
  });

  return <div className={styles.container}>{avatarList}</div>;
};

export default AvatarList;
