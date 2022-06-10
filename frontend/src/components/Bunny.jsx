import { Stage, Sprite } from '@inlet/react-pixi';
import Joker from "../assets/Plebes_Anim_JokerFalse_1x.png";

const Bunny = () => (
  <Stage width={300} height={300} options={{ backgroundColor: 0xeef1f5 }}>
    <Sprite image={Joker} x={100} y={100} scale={{ x: 2, y: 2 }}/>
  </Stage>
);

export default Bunny;