import '../../styles/Card.scss';
import { Stage, Container, AnimatedSprite, Sprite } from '@inlet/react-pixi';

const animatedCards = [1, 2, 3, 4, 50, 51, 52, 54, 53, 41, 42, 43, 44, 45, 46, 47, 48];

const Card = ({ image_front, id }) => {
  return (
    <div className="Card">
      {animatedCards.includes(id) ? (
        <Stage width={160} height={210}>
          <Container position={[80, 105]}>
            <AnimatedSprite width={150} height={200} anchor={0.5} images={JSON.parse(image_front)} isPlaying={true} initialFrame={0} animationSpeed={0.1} />
          </Container>
        </Stage>
      ) : (
        <Stage width={160} height={210}>
          <Container position={[80, 105]}>
            <Sprite width={150} height={200} anchor={0.5} x={0} y={0} image={image_front} />
          </Container>
        </Stage>
      )}
    </div>
  );
};

export default Card;
