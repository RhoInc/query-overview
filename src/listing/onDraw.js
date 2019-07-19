import addHeaderTooltips from './onDraw/addHeaderTooltips';
import updateColumnSorting from './onDraw/updateColumnSorting';
import truncateCellText from './onDraw/truncateCellText';
import moveScrollBarLeft from './onDraw/moveScrollBarLeft';

export default function onDraw() {
    //console.log(this.table.selectAll('thead tr th'));
    //console.log(this.table.selectAll('tbody tr:first-child td'));
    const variables = Object.keys(this.data.raw[0])
        //.sort(d3.ascending)
        .map((variable, i) => {
            return {
                variable,
                column: this.config.cols.find(col => col === variable),
                columnIndex: this.config.cols.findIndex(col => col === variable),
                header: this.config.headers[this.config.cols.findIndex(col => col === variable)],
                headerIndex: this.config.headers.findIndex(col => col === variable)
            };
        });
    //console.table(variables.sort((a,b) => a.index - b.index));
    //Add tooltips to column headers.
    addHeaderTooltips.call(this);

    //Update default Webcharts column sorting.
    updateColumnSorting.call(this);

    //Truncate cells with length greater than `settings.truncation_cutoff`.
    truncateCellText.call(this);

    //Move table scrollbar all the way to the left.
    moveScrollBarLeft.call(this);
}
