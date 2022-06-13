import '../../styles/Card.scss';
import queen from '../../assets/sprites/animated-sprites/queen/queen-diamonds.gif';

const animatedCards = [1, 2, 3, 4, 50, 51, 52, 54, 53, 41, 42, 43, 44, 45, 46, 47, 48];

const Card = ({ image_front, id }) => {
  // return <div className="Card">{!animatedCards.includes(id) && <img src={image_front} alt="" />}</div>;
  return <img src={queen} alt="" />;
};

export default Card;
