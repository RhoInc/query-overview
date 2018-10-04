import onClick from './onDraw/onClick';
import moveScrollBarLeft from './onDraw/moveScrollBarLeft';

export default function onDraw() {
    onClick.call(this);

    //Move table scrollbar all the way to the left.
    moveScrollBarLeft.call(this);
}
