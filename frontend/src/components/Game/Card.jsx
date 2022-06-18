import '../../styles/Game/Card.scss';

import { MdOutlineError } from 'react-icons/md';

const Card = (props) => {
  const { image, card_name, warning } = props;
  return (
    <div className="Card">
      <div title="Same suit as enemy" className="warning">
        {warning && <MdOutlineError size={30} />}
      </div>
      <img className="Card" src={image} alt={card_name} />
    </div>
  );
};

export default Card;
