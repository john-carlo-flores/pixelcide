import '../../styles/Game/Status.scss';
import Button from '../Button';

const Status = (props) => {
  const { status, clickHandler } = props;

  return (
    <Button onClick={clickHandler} error>
      Commit Move
    </Button>
  );
};
export default Status;
