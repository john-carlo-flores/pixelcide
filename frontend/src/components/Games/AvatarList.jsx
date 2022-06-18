import Avatar from "./Avatar";

import styles from "../../styles/Games/AvatarList.module.scss";

const AvatarList = (props) => {
  const { avatars } = props;
  const baseURL =
    "https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/";
  const avatarList = avatars.map((avatar) => {
    return <Avatar key={avatar} url={`${baseURL}${avatar}.png`} />;
  });

  return <div className={styles.container}>{avatarList}</div>;
};

export default AvatarList;
