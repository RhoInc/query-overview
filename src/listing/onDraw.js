import addHeaderTooltips from './onDraw/addHeaderTooltips';
import updateColumnSorting from './onDraw/updateColumnSorting';
import truncateCellText from './onDraw/truncateCellText';
import moveScrollBarLeft from './onDraw/moveScrollBarLeft';

export default function onDraw() {
    //Add tooltips to column headers.
    addHeaderTooltips.call(this);

    //Update default Webcharts column sorting.
    updateColumnSorting.call(this);

    //Truncate cells with length greater than `settings.truncation_cutoff`.
    truncateCellText.call(this);

    //Move table scrollbar all the way to the left.
    moveScrollBarLeft.call(this);
}
