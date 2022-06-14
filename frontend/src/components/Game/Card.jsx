import '../../styles/Game/Card.scss';

const Card = (props) => {
  const { image, id, card_name } = props;
  return <img className="Card" src={image} alt={card_name} />;
};

export default Card;
