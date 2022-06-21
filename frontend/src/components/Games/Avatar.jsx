import "../../styles/Game/Avatar.scss";

const Avatar = (props) => {
  const { id, width } = props;

  const baseUrl = "https://raw.githubusercontent.com/tothenextcode/pixelcide/0c014dddf1c79795ab91f527a0afb0497c5bb6de/frontend/src/assets/avatars/";
  return (
    <div className="Avatar">
      <img src={`${baseUrl}${id}.svg`} alt="Avatar" />
    </div>
  );
};

export default Avatar;
