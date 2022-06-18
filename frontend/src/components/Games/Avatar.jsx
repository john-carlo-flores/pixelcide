import styles from "../../styles/Games/Avatar.module.scss";

const Avatar = (props) => {
  const { url } = props;

  return (
    <div>
      <img 
        className={`${styles.avatar} nes-avatar is-large is-rounded`}
        src={url}
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;