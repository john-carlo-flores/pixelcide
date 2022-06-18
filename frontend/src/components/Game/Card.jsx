import '../../styles/Game/Card.scss';

import { AiFillWarning } from 'react-icons/ai';

const Card = (props) => {
  const { image, card_name, warning } = props;
  return (
    <div className="Card">
      <div title="Same suit as enemy" className="warning">
        {warning && <AiFillWarning size={30} />}
      </div>
      <img className="Card" src={image} alt={card_name} />
    </div>
  );
};

export default Card;
