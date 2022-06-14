import Seat from './Seat';
import Empty from './Empty';

const SeatList = (props) => {
  const { user, seats, updateSeatCount, takeSeat } = props;

  return (
    <>
      <div>
        <Seat />   
        <Seat />
      </div>
      <div>
        <Seat />   
        <Seat />
      </div>
    </>
  );
};

export default SeatList;