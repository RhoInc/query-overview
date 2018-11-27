import updateColumnSorting from './onDraw/updateColumnSorting';
import moveScrollBarLeft from './onDraw/moveScrollBarLeft';

export default function onDraw() {
    //Update default Webcharts column sorting.
    updateColumnSorting.call(this);

    //Move table scrollbar all the way to the left.
    moveScrollBarLeft.call(this);
}
