import "../../styles/Game/Avatar.scss";

const Avatar = (props) => {
  const { id, width } = props;

  const baseUrl = "https://raw.githubusercontent.com/tothenextcode/pixelcide/d5351456307843fa0a36c2df3ae67da6b3244d09/frontend/src/assets/avatars/";
  return (
    <div className="Avatar">
      <img src={`${baseUrl}${id}.svg`} alt="Avatar" />
    </div>
  );
};

export default Avatar;
