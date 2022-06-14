import '../../styles/Game/Status.scss';
import Button from '../Button';

const Status = (props) => {
  const { status, playerField, setPlayerField, setDiscard } = props;

  const clickHandler = () => {
    setDiscard((prev) => [...prev, ...playerField]);
    setPlayerField([]);
  };

  return (
    <Button onClick={clickHandler} error>
      Commit Move
    </Button>
  );
};
export default Status;
