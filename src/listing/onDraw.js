import updateColumnSorting from './onDraw/updateColumnSorting';
import truncateCellText from './onDraw/truncateCellText';
import moveScrollBarLeft from './onDraw/moveScrollBarLeft';

export default function onDraw() {
    //Update default Webcharts column sorting.
    updateColumnSorting.call(this);

    //Truncate cells with length greater than `settings.truncation_cutoff`.
    truncateCellText.call(this);

    //Move table scrollbar all the way to the left.
    moveScrollBarLeft.call(this);
}
