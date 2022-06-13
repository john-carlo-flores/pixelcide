import Card from './Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8080/cards';

const Deck = ({ deck }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="Deck">
      {data.map((card) => (
        <Card id={card.id} name={card.card_name} key={card.id} image_front={card.image_front} image_back={card.image_back} />
      ))}
    </div>
  );
};

export default Deck;
