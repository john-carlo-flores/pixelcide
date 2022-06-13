import '../../styles/Card.scss';

const Card = ({ image_front, id, card_name }) => {
  return <img src={image_front} alt={card_name} />;
};

export default Card;
