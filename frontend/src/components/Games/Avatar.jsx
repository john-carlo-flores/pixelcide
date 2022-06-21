import "../../styles/Game/Avatar.scss";

const Avatar = (props) => {
  const { id, width } = props;

  const baseUrl =
    "https://raw.githubusercontent.com/tothenextcode/pixelcide/4719b98b6e86c3722d5407182d15547969c5d32d/frontend/src/assets/avatars/";

  return (
    <div className="Avatar">
      <img src={`${baseUrl}${id}.svg`} alt="Avatar" />
    </div>
  );
};

export default Avatar;
