import Button from '../Button';

const Empty = (props) => {
  const { onClick } = props;

  return (
    <div>
      <Button onClick={onClick} primary>+</Button>
    </div>
  );
};

export default Empty;